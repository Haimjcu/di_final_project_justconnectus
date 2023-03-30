import AutoComplete from "@Components/AutoComplete";
import AutoCompleteTag from "@Components/AutoCompleteTag";
import globalUseStyles from "@Hooks/styleHooks";
import { Box, ButtonBase, FormControl, Typography } from "@material-ui/core";
import { optionType } from "@Store/common/type";
import { SearchType } from "@Utils/constants";
import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";

import { useStyles } from "./styles";

const SearchHeader = (props: any) => {
  const {
    getSkills,
    skills,
    filter,
    userId,
    fetchMyConnections,
    fetchCommunities,
    setSearchFilter,
    setSubmitted,
    connectionsCount,
    communityCount,
    clearResults,
    searchInit,
    searchFinished,
    createSearchMeta,
    firstSearch,
    clearedSearch,
    getCountries,
    getStatesByCountryCode,
    country,
    state,
    connections,
    providers,
    selectedShoutout,
    shoutoutSkills,
  } = props;
  const classes = useStyles();
  const globalClasses = globalUseStyles();
  const [selectedSkills, setSelctedSkills] = useState<any[]>(
    shoutoutSkills.map((sk: any) => ({
      label: sk.skill.skill,
      value: sk.skill.id,
    })),
  );
  const [countries, setCountries] = useState<optionType[]>([]);
  const [states, setStates] = useState<optionType[]>([]);
  const [type, setType] = useState<string>(SearchType.CONNECTION);
  const [stateTrigger, setStateTrigger] = useState<string>(country);
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
  let location = [country,state];

  useEffect(() => {
    getSkills({ offset: 0, limit: 2000 });
  }, [getSkills]);

  const options = useMemo(
    () =>
      skills.map((item: { skill: string; id: string }) => ({
        label: item.skill,
        value: item.id,
      })),
    [skills],
  );

  const searchTypes = useMemo(
    () => [
      { label: "Community", value: SearchType.COMMUNITY },
      { label: "My Connections", value: SearchType.CONNECTION },
    ],
    [],
  );

  const handleSearch = async () => {
    console.log(`handleSearch`);
    if (selectedSkills?.length) {
      const skillIds = selectedSkills?.map((item) => item.value);
      searchInit();
      setSearchFilter({
        ...filter,
        skills: skillIds,
        location: location,
      });
      setSubmitted(true);
      await fetchMyConnections({
        userId,
        skills: skillIds,
      });
      await fetchCommunities({
        userId,
        skills: skillIds,
      });
      createSearchMeta({ skills: skillIds });
      searchFinished();
      // if (type === SearchType.CONNECTION) {
      //   await fetchMyConnections({
      //     userId,
      //     skills: selectedSkills?.map((item) => item.value),
      //   });
      // } else {
      //   await fetchCommunities({
      //     userId,
      //     skills: selectedSkills?.map((item) => item.value),
      //   });
      // }
    }
  };

  const handleTypeChange = (value: string) => {
    setType(value);
    setSearchFilter({ ...filter, type: value });
  };

  const handleSkillChange = (items: any[]) => {
    setSelctedSkills(items);
    setSearchFilter({
      ...filter,
      skills: selectedSkills?.map((item) => item.value),
    });
    if (items.length === 0) {
      clearResults();
    }
  };

  const forceCommunity = () => {
    type === SearchType.CONNECTION && connectionsCount==0 && communityCount > 0 ? handleTypeChange(SearchType.COMMUNITY) : null;
  };

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
    setSearchFilter({ ...filter, location: location });
  }, [getCountries], );

  const handleCountryChange = (country: optionType) => {
    setStateTrigger(country?.value);
    let newCountry = country?.value!='' ? country?.value : null;
    location = [newCountry, null];
    setSearchFilter({ ...filter, location: location });
    connections.length > 0 ? locationConnectionsCount() : null;
  };

  const handleStateChange = (state: optionType) => {
    location[1] = state?.value !='' ? state?.value : null;
    setSearchFilter({ ...filter, location: location });
    connections.length > 0 ? locationConnectionsCount() : null;
  };

  useEffect(() => {
    const fetchStates = async () => {
      const response = await getStatesByCountryCode(stateTrigger);
      if (response.success) {
        const stateOptions = response.data.map(
          (state: any) =>
            ({
              label: state.name,
              value: state.name.replace(" District",""),
            } as optionType),
        );
        stateTrigger=='IL' ? (stateOptions.push(israelStates[0]), stateOptions.push(israelStates[1]), stateOptions.sort((a:any, b:any) => a.value.localeCompare(b.value)) ) : null;
        setStates(stateOptions);
      }
    };
    if (location[0]) {
      fetchStates();
    }
  }, [stateTrigger, getStatesByCountryCode]);

  const locationCommunityCount = () => {
    let calculatedCommunityCount=0;
    filter.location[0] !==null ?
    providers.map((provider: any) =>  filter.location[1] !==null && provider?.country==filter.location[0] &&  provider?.state==filter.location[1] ? calculatedCommunityCount++ 
    : provider?.country==filter.location[0] ? calculatedCommunityCount++
    : "")
    : calculatedCommunityCount=communityCount;
    return calculatedCommunityCount;
  }

  const locationConnectionsCount = () => {
      let uniqueProviders : any[] = [];
      connections.map((connection: any) => (
        connection?.providers?.map((provider: any) => 
        filter.location[0] !==null ?
          provider?.country==filter.location[0] &&  provider?.state==filter.location[1] && filter.location[1] !==null ? 
          uniqueProviders.includes(provider.id) ? null : uniqueProviders.push(provider.id)
  
          : provider?.country==filter.location[0] && filter.location[0] !==null ? uniqueProviders.includes(provider.id)  ? null : uniqueProviders.push(provider.id) 
          : null
        : uniqueProviders.includes(provider.id) ? null : uniqueProviders.push(provider.id)
        )
      ))
    return uniqueProviders.length;
  }

  useEffect(() => {
    console.log(`haim useeffect`),
    Object.keys(selectedShoutout).length ? (
      console.log(`haim selectedShoutout`),
      location = [selectedShoutout.country || null,selectedShoutout.state || null],
      console.log(`haim location ${location}`),
      setSearchFilter({
        ...filter,
        location: location,
      }),
    console.log(`haim searchfilter ${JSON.stringify(state.filter)}`),
    handleSearch()
    ) : null;
  }, [selectedShoutout]);


  return (
    <div className={classes.searchPage}>
      <Typography variant="h6" className={clsx(classes.mobileTitle)}>
        Fill out a search
      </Typography>
      <Box className={clsx(classes.searchHeader)}>
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
        <Box className={classes.location}>
          <label>Location</label>
          <FormControl variant="filled" className={classes.selectCountry}>
            <AutoComplete 
              selectedValue={countries.find(
                (countryy) => countryy.value === filter.location[0],
              )}
              options={countries}
              placeholder={"Select Country"}
              onChange={(option: optionType) =>
                handleCountryChange(option)
              }
            />
          </FormControl>
          {location!==null && location[0]!=='' && <FormControl variant="filled" className={classes.selectState}>
            <AutoComplete
              selectedValue={states.find(
                (statee) => statee.value === filter.location[1],
              )}
              options={states}
              placeholder={"Select State"}
              onChange={(option: optionType) =>
               handleStateChange(option)
              }
            />
          </FormControl>
          }
        </Box>
        <Box className={clsx(classes.type, globalClasses.onlyDesktop)}>
          <label>Type</label>
          <Box className={clsx(globalClasses.flex)} style={{ gap: 6 }}>
            <ButtonBase
              className={clsx(
                classes.typeItem,
                globalClasses.flexCenter,
                type === SearchType.COMMUNITY ? classes.activeType : "",
              )}
              onClick={() => handleTypeChange(SearchType.COMMUNITY)}
            >
              {forceCommunity()}
              {`Community (${locationCommunityCount()})`}
            </ButtonBase>
            <ButtonBase
              className={clsx(
                classes.typeItem,
                globalClasses.flex,
                globalClasses.alignCenter,
                type === SearchType.CONNECTION ? classes.activeType : "",
              )}
              onClick={() => handleTypeChange(SearchType.CONNECTION)}
            >
              {`My Connections (${locationConnectionsCount()})`}
            </ButtonBase>
          </Box>
        </Box>
        <Box className={globalClasses.onlyMobile}>
          <FormControl variant="filled">
            <AutoComplete
              label="Type"
              options={searchTypes}
              selectedValue={searchTypes.find(
                (searchType) => searchType.value === type,
              )}
              onChange={(option: optionType) => handleTypeChange(option.value)}
            />
          </FormControl>
        </Box>
        <Box className={globalClasses.onlyMobile}>
        { firstSearch === false ? `Step1 - how to search`
          : ""}
      </Box>
        <Box
          className={clsx(globalClasses.flex, classes.buttons)}
          style={{ gap: 8 }}
        >
          <ButtonBase className={clsx(classes.button, classes.bottom)} style={{ display: "none" }}>
            SHOUT OUT
          </ButtonBase>
          <ButtonBase className={classes.button} style={{ maxWidth: "100%" }} onClick={handleSearch}>
            Search
          </ButtonBase>
        </Box>
      </Box>
      <Box className={globalClasses.onlyDesktop}>
        { firstSearch === false ? `Step1 - how to search`
          : locationConnectionsCount()==0 && locationCommunityCount() == 0 && firstSearch===true && clearedSearch===false ? 'No Results'
          : ""}
      </Box>
    </div>
  );
};

export default SearchHeader;
