import { Autocomplete, TextField } from "@mui/material";
import { Col, Form } from "react-bootstrap";
import '../../Containers/StyleSheet/UpdateScreen.css'
import styled from "styled-components";


const StyledFormLabel = styled(Form.Label)`
  white-space: nowrap;
`;
export default function DropDownUnit({ label, placeholder, value, setValue, list, error, propertyName, size, disable }) {

    return (
        <Form.Group as={Col} md={size} style={{ fontSize: '18px', marginBottom: '20px' }}>
            <StyledFormLabel>{label}</StyledFormLabel>
            <Autocomplete
                required
                disablePortal
                disabled={disable}
                className="form-control ZipcodeSelector"
                size="small"
                options={list.map((option) => option[propertyName])}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        error={error}
                        label={placeholder}
                        required
                    />}
                value={value}
                onChange={(event, value) => setValue(value)}
            />
        </Form.Group>
    )
}


export function DropDownUnit2({ label, placeholder, value, setValue, list, error, size, disable }) {

    return (
        <Form.Group as={Col} md={size} style={{ fontSize: '18px', marginBottom: '20px' }}>
            <StyledFormLabel>{label}</StyledFormLabel>
            <Autocomplete
                required
                disablePortal
                disabled={disable}
                className="form-control ZipcodeSelector"
                size="small"
                options={list}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        error={error}
                        label={placeholder}
                        required
                    />}
                value={value}
                onChange={(event, value) => setValue(value)}
            />
        </Form.Group>
    )
}