import AutoComplete from "@Components/AutoComplete";
import AutoCompleteTag from "@Components/AutoCompleteTag";
import CustomInputField from "@Components/TextInput";
import globalUseStyles from "@Hooks/styleHooks";
import { optionType } from "@Store/common/type";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import { useTranslation } from "@Translations";
import clsx from "clsx";
import { useFormik } from "formik";
import Close from "icons/Close";
import { initialState } from "@Store/rootReducer";
import React, {useEffect,useState, useMemo} from "react";
import { useSelector } from "react-redux";
import { ModalType } from "@Utils/constants";

export default function ContactInfo(props: any) {
  const {
    open,
    getSkills,
    title,
    description,
    skills,
    updateShoutout,
    showNotification,
    closeModal,
    getCountries,
    getStatesByCountryCode,
    country,
    state,
  } = props;
  const { t } = useTranslation();
  const globalClasses = globalUseStyles();
  const [selectedSkills, setSelctedSkills] = useState<any[]>();
  const [countries, setCountries] = useState<optionType[]>([]);
  const [states, setStates] = useState<optionType[]>([]);
  const isLoading = useSelector(
    (state: typeof initialState) => state.shoutout.isLoading,
  );
  const israelStates = [
    {
      label: 'Judea',
      value: 'Judea',
    } as optionType,
    {
      label: 'Samaria',
      value: 'Samaria',
    } as optionType
  ]

  useEffect(() => {
    getSkills({ offset: 0, limit: 2000 });
  }, [getSkills]);


  const newSkills = selectedSkills?.map((item) => item.value);

  const formik = useFormik({
    initialValues: {
      title,
      description,
      country,
      state,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const response = await updateShoutout({title: values.title , description: values.description,country: values.country,state: values.state, skills: newSkills});
      if (response.success) {
        handleClose();
        showNotification({
          type: "success",
          message: t("common:saved_successfully"),
        });
      } else {
        console.log(`haim error ${JSON.stringify(response)}`);
        showNotification({
          type: "error",
          message: t("common:something_wrong"),
        });
      }
    },
  });

  const options = useMemo(
    () =>
      skills.map((item: { skill: string; id: string }) => ({
        label: item.skill,
        value: item.id,
      })),
    [skills],
  );

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await getCountries();
      if (response.success) {
        const countryOptions = response.data.map(
          (country: any) =>
            ({
              label: country.name,
              value: country.code,
            } as optionType),
        );
        setCountries(countryOptions);
      }
    };
    fetchCountries();
  }, [getCountries]);

  const handleCountryChange = (country: optionType) => {
    formik.setFieldValue("country", country?.value || "");
  };

  const handleStateChange = (state: optionType) => {
    formik.setFieldValue("state", state?.value);
  };

  useEffect(() => {
    const fetchStates = async () => {
      const response = await getStatesByCountryCode(formik.values.country);
      if (response.success) {
        const stateOptions = response.data.map(
          (state: any) =>
            ({
              label: state.name,
              value: state.name.replace(" District",""),
            } as optionType),
        );
        formik.values.country=='IL' ? (stateOptions.push(israelStates[0]), stateOptions.push(israelStates[1]), stateOptions.sort((a:any, b:any) => a.value.localeCompare(b.value))) : "";
        setStates(stateOptions);
      }
    };
    if (formik.values.country) {
      fetchStates();
    }
  }, [formik.values.country, getStatesByCountryCode]);

  const handleClose = () => {
    closeModal(ModalType.SHOUTOUT_MODAL);
  };

  const handleSkillChange = (items: any[]) => {
    setSelctedSkills(items);
  };

  console.log('haim modal');
  return (
    <Modal
      aria-labelledby="add-note-agent-modal-title"
      aria-describedby="add-note-agent-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      className={globalClasses.modal}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <form onSubmit={formik.handleSubmit} className={globalClasses.paper}>
          <Grid className="modal-root">
            <Box p={{ xs: 2, sm: 3 }} className={globalClasses.modalHeader}>
              <Typography variant="h5">
                {t("common:create_a_shoutout")}
              </Typography>
              <Button onClick={handleClose} className={globalClasses.closeIcon}>
                <Close fill="#2B2B36" />
              </Button>
            </Box>
            <Box
              className={globalClasses.modalBody}
              py={{ xs: 0, sm: 2 }}
              px={{ xs: 2, sm: 5 }}
            >
              <CustomInputField
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                placeholder=""
                label="Title"
              />
              <TextField
                  name="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  label="Description"
                  multiline
                  variant="filled"
                  minRows={5}
                  inputProps={{ maxLength: 1500 }}
              />

                <AutoCompleteTag
                    input={{
                        value: selectedSkills,
                        onChange: (value: any[]) => {
                        handleSkillChange(value);
                        },
                        name: "skills",
                    }}
                    label={"Skills"}
                    options={options}
                    placeholder={"Select skills"}
                    meta={{
                        touched: false,
                        error: false,
                    }}
                    noOptionsText="No results found"
                />
                    <FormControl variant="filled">
                      <AutoComplete
                        label="Country"
                        selectedValue={countries.find(
                          (countryy) => countryy.value === country,
                        )}
                        options={countries}
                        onChange={(option: optionType) =>
                          handleCountryChange(option)
                        }
                      />
                    </FormControl>
                    <FormControl variant="filled">
                      <AutoComplete
                        label="State"
                        selectedValue={states.find(
                          (statee) => statee.value === state,
                        )}
                        options={states}
                        onChange={(option: optionType) =>
                          handleStateChange(option)
                        }
                      />
                    </FormControl>
            </Box>
            <Box
              py={2}
              px={{ xs: 2, sm: 5 }}
              className={clsx(
                globalClasses.modalFooter,
                globalClasses.flexCenter,
              )}
            >
              <Button
                type="button"
                variant="outlined"
                color="primary"
                onClick={handleClose}
              >
                {t("common:cancel")}
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {t("common:post_shoutout")}
              </Button>
            </Box>
          </Grid>
        </form>
      </Fade>
    </Modal>
  );
}
