import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import '../../../Containers/StyleSheet/UpdateScreen.css'
import AutoAddInputField from "./AutoAdd";
import FormUnit from "../../ReuseableComponent/FormUnit";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getItems, updateItem } from "../../../Redux/actions/parts_action";
import { isDeepEqual } from "@mui/x-data-grid/internals";

const ErrorStyled = styled.div`
    padding-left: 5px;
    width: 100%;
    margin-top: 0.25rem;
    font-size: .875em;
    color: #dc3545;
    `;




export default function AddParts() {

    // create parts
    const [createPart, setcreatePart] = useState('');
    const [partPrice, setPartPrice] = useState('');
    const [install, setInstall] = useState('');
    const [uninstall, setUninstall] = useState('');
    const [hauloff, setHaulOff] = useState('');
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [error3, setError3] = useState(false);
    const [error4, setError4] = useState(false);
    const [error5, setError5] = useState(false);
    const [validationFlag, setvalidationFlag] = useState('')
    const [validated, setValidated] = useState(false);
    const [result, setResult] = useState();
    const [message, setMessage] = useState();

    const [isNewPart, setIsNewPart] = useState(true)
    const [isAddFlag, setIsAddFlag] = useState(false)
    const [isUpdateFlag, setIsUpdateFlag] = useState(false)



    const dispatch = useDispatch();
    const parts = useSelector((state) => state.parts.parts);

    useEffect(() => {
        dispatch(getItems());
    }, []);

    const handleAddNewItem = (newItem) => {
        // Replace with your item data
        dispatch(addItem(newItem));
    };

    const handleUpdateItem = (item) => {
        // Update 'item' and then dispatch the update action
        dispatch(updateItem(item));
    };

    useEffect(() => {
        if (!createPart) {
            setIsNewPart(true)
            setIsUpdateFlag(false)
            setValidated(false)
        }
    }, [createPart]);

    useEffect(() => {
        // setValidated(false)
        const filteredArray = parts && createPart && parts.filter(obj => obj.partName === createPart.partName);
        if (filteredArray && filteredArray.length > 0) {
            filteredArray[0].partPrice ? setPartPrice(filteredArray[0].partPrice) : setPartPrice('')
            filteredArray[0].installation ? setInstall(filteredArray[0].installation) : setInstall('')
            filteredArray[0].unInstallation ? setUninstall(filteredArray[0].unInstallation) : setUninstall('')
            filteredArray[0].haulOff ? setHaulOff(filteredArray[0].haulOff) : setHaulOff('')
        } else {
            setPartPrice('')
            setInstall('')
            setUninstall('')
            setHaulOff('')
        }
    }, [parts, createPart]);



    const errorMessage = 'Please provide a valid input'
    const dataNotChange = 'No Changes made in existing data, Please provide new value/s'



    function validateField() {
        if (createPart === '') {
            setError1(true)
        }
        if (partPrice === '') {
            setError2(true)
        }
        if (install === '') {
            setError3(true)
        }
        if (uninstall === '') {
            setError4(true)
        }
        if (hauloff === '') {
            setError5(true)
        }
    }

    function isValidInput(parts, setError) {
        if (parts === '') {
            setError(true)
            return false
        } else {
            setError(false)
            return true
        }
    }
    function handleAdd(event) {
        event.preventDefault();
        setValidated(false)
        setError1(false)
        setError2(false)
        setError3(false)
        setError4(false)
        setError5(false)
        validateField()

        if (isValidInput(createPart, setError1) &&
            isValidInput(partPrice, setError2) &&
            isValidInput(install, setError3) &&
            isValidInput(uninstall, setError4) &&
            isValidInput(hauloff, setError5) &&
            isNewPart) {
            let AddItemArray = {
                'partName': createPart.partName,
                'partPrice': partPrice,
                'install': install,
                'uninstall': uninstall,
                'hauloff': hauloff,
                'setValidated': setValidated,
            }
            handleAddNewItem(AddItemArray)
        }
    }
    function handleUpdate(event) {
        event.preventDefault();
        setValidated(false)
        setIsUpdateFlag(false)
        setError1(false)
        setError2(false)
        setError3(false)
        setError4(false)
        setError5(false)
        validateField()

        const previousData =
            parts &&
            createPart &&
            parts.filter(obj => obj.partName === createPart.partName);

        let oldpartPrice = previousData[0].partPrice
        let oldpartinstallation = previousData[0].installation
        let oldpartunInstallation = previousData[0].unInstallation
        let oldparthaulOff = previousData[0].haulOff

        if (isValidInput(createPart, setError1) &&
            isValidInput(partPrice, setError2) &&
            isValidInput(install, setError3) &&
            isValidInput(uninstall, setError4) &&
            isValidInput(hauloff, setError5) &&
            !isNewPart) {
            if (
                !isDeepEqual(parseFloat(oldpartPrice), parseFloat(partPrice)) ||
                !isDeepEqual(parseFloat(oldpartinstallation), parseFloat(install)) ||
                !isDeepEqual(parseFloat(oldpartunInstallation), parseFloat(uninstall)) ||
                !isDeepEqual(parseFloat(oldparthaulOff), parseFloat(hauloff))
            ) {
                let UpdatedItemArray = {
                    'partName': createPart.partName,
                    'partPrice': partPrice,
                    'install': install,
                    'uninstall': uninstall,
                    'hauloff': hauloff,
                    'setValidated': setValidated,
                }
                handleUpdateItem(UpdatedItemArray)
            } else {
                setIsUpdateFlag(true)
                setValidated(false)
            }


        }
    }
    function handleReset(event) {
        event.preventDefault();
        setcreatePart('')
        setInstall('')
        setUninstall('')
        setHaulOff('')
        setValidated(false)
        setIsUpdateFlag(false)
        setError1(false)
        setError2(false)
        setError3(false)
        setError4(false)
        setError5(false)
    }

    return <>
        <Form noValidate validated={validated} >
            <Row className="mb-3 ">
                <Form.Group as={Col} md="3" controlId="validationCustom02">
                    <Form.Label>Add Part</Form.Label>
                    <AutoAddInputField
                        value={createPart}
                        setValue={setcreatePart}
                        error={error1}
                        list={parts}
                        setIsNewPart={setIsNewPart}
                    />
                    <ErrorStyled>
                        {error1 && errorMessage}
                    </ErrorStyled>
                </Form.Group>
            </Row>
            <Row className="mb-3 ProRow">
                <FormUnit
                    label='Part Price'
                    value={partPrice}
                    setValue={setPartPrice}
                    error={error2}
                    errorMessage={errorMessage}
                    size='2'
                />
                <FormUnit
                    label='Installation'
                    value={install}
                    setValue={setInstall}
                    error={error3}
                    errorMessage={errorMessage}
                    size='2'
                />
                <FormUnit
                    label='Uninstallation'
                    value={uninstall}
                    setValue={setUninstall}
                    error={error4}
                    errorMessage={errorMessage}
                    size='2'
                />
                <FormUnit
                    label='Hauloff'
                    value={hauloff}
                    setValue={setHaulOff}
                    error={error5}
                    errorMessage={errorMessage}
                    size='2'
                />
                <div className='updatebtnCoverZip' md="6">
                    {isNewPart ?
                        <Button
                            type="submit"
                            className='buttonstyled'
                            style={{ maxHeight: '36px' }}
                            onClick={(e) => handleAdd(e)}
                        >
                            Add
                        </Button>
                        :
                        <Button
                            type="submit"
                            className='buttonstyled'
                            style={{ maxHeight: '36px' }}
                            onClick={(e) => handleUpdate(e)}
                        >
                            Update
                        </Button>
                    }
                    <Button
                        type="submit"
                        className='buttonstyled'
                        style={{ maxHeight: '36px' }}
                        onClick={(e) => handleReset(e)}
                    >
                        Reset
                    </Button>
                </div>

                {isAddFlag &&
                    < div style={{ color: 'green' }}>
                        {message}
                    </div>
                }

                {isUpdateFlag &&
                    <div style={{ color: 'red' }}>
                        {dataNotChange}
                    </div>
                }


            </Row>
        </Form >
    </>
}