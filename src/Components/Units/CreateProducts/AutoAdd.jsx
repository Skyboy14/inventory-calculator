import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function AutoAddInputField({ value, setValue, error, list, setIsNewPart }) {

    return (
        <Autocomplete
            value={value}
            size='small'
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setValue({
                        partName: newValue,
                    });
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input

                    setIsNewPart(true)
                    setValue({
                        partName: newValue.inputValue,
                    });
                } else {
                    // existing
                    setIsNewPart(false)
                    setValue(newValue);
                    // make get call to set the values
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = inputValue && options.some((option) => inputValue === option.partName);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        partName: `Add "${inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={list}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.partName;
            }}
            renderOption={(props, option) => <li {...props}>{option.partName}</li>}
            sx={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
                <TextField {...params} error={error} label="Parts" />
            )}
        />
    );
}