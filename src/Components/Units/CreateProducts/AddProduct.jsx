import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import '../../../Containers/StyleSheet/UpdateScreen.css'
import AutoAddInputField from "./AutoAdd";
import FormUnit from "../../ReuseableComponent/FormUnit";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getItems, updateItem } from "../../../Redux/actions/product_action";
import { isDeepEqual } from "@mui/x-data-grid/internals";

const ErrorStyled = styled.div`
    padding-left: 5px;
    width: 100%;
    margin-top: 0.25rem;
    font-size: .875em;
    color: #dc3545;
    `;

export default function AddProduct() {

    // create products
    const [createProduct, setcreateProduct] = useState('');
    const [baseCategory, setBaseCategory] = useState('');
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

    const [isNewProduct, setIsNewProduct] = useState(true)
    const [isAddFlag, setIsAddFlag] = useState(false)
    const [isUpdateFlag, setIsUpdateFlag] = useState(false)



    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const baseCategorys = useSelector((state) => state.products.products);



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
        if (!createProduct) {
            setIsNewProduct(true)
            setIsUpdateFlag(false)
            setValidated(false)
        }
    }, [createProduct]);

    useEffect(() => {
        // setValidated(false)
        const filteredArray = products && createProduct && products.filter(obj => obj.productName === createProduct.productName);
        if (filteredArray && filteredArray.length > 0) {
            filteredArray[0].baseCategory ? setBaseCategory(filteredArray[0].baseCategory) : setBaseCategory('')
            filteredArray[0].installation ? setInstall(filteredArray[0].installation) : setInstall('')
            filteredArray[0].unInstallation ? setUninstall(filteredArray[0].unInstallation) : setUninstall('')
            filteredArray[0].haulOff ? setHaulOff(filteredArray[0].haulOff) : setHaulOff('')
        } else {
            setBaseCategory('')
            setInstall('')
            setUninstall('')
            setHaulOff('')
        }
    }, [products, createProduct]);



    const errorMessage = 'Please provide a valid input'
    const dataNotChange = 'No Changes made in existing data, Please provide new value/s'



    function validateField() {
        if (createProduct === '') {
            setError1(true)
        }
        if (baseCategory === '') {
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

    function isValidInput(products, setError) {
        if (products === '') {
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

        if (isValidInput(createProduct, setError1) &&
            isValidInput(baseCategory, setError2) &&
            isValidInput(install, setError3) &&
            isValidInput(uninstall, setError4) &&
            isValidInput(hauloff, setError5) &&
            isNewProduct) {
            let AddItemArray = {
                'productName': createProduct.productName,
                'baseCategory': baseCategory,
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
            products &&
            createProduct &&
            products.filter(obj => obj.productName === createProduct.productName);

        let oldbaseCategory = previousData[0].baseCategory
        let oldproductinstallation = previousData[0].installation
        let oldproductunInstallation = previousData[0].unInstallation
        let oldproducthaulOff = previousData[0].haulOff

        if (isValidInput(createProduct, setError1) &&
            isValidInput(baseCategory, setError2) &&
            isValidInput(install, setError3) &&
            isValidInput(uninstall, setError4) &&
            isValidInput(hauloff, setError5) &&
            !isNewProduct) {
            if (
                !isDeepEqual(oldbaseCategory, baseCategory) ||
                !isDeepEqual(parseFloat(oldproductinstallation), parseFloat(install)) ||
                !isDeepEqual(parseFloat(oldproductunInstallation), parseFloat(uninstall)) ||
                !isDeepEqual(parseFloat(oldproducthaulOff), parseFloat(hauloff))
            ) {
                let UpdatedItemArray = {
                    'productName': createProduct.productName,
                    'baseCategory': baseCategory,
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
        setcreateProduct('')
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
                    <Form.Label>Add Product</Form.Label>
                    <AutoAddInputField
                        value={createProduct}
                        setValue={setcreateProduct}
                        error={error1}
                        list={products}
                        setIsNewProduct={setIsNewProduct}
                    />
                    <ErrorStyled>
                        {error1 && errorMessage}
                    </ErrorStyled>
                </Form.Group>
            </Row>
            <Row className="mb-3 ProRow">
                <FormUnit
                    label='Product Category'
                    value={baseCategory}
                    setValue={setBaseCategory}
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
                    {isNewProduct ?
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