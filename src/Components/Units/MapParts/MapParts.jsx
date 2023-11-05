import { useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import '../../../Containers/StyleSheet/UpdateScreen.css'
import { useDispatch, useSelector } from "react-redux";
import DropDownUnit from "../../ReuseableComponent/DropDownUnit";
import { mapPart } from "../../../Redux/apiServices/mapPartService";
import styled from "@emotion/styled";
import { fetchparts } from "../../../Redux/apiServices/partServices";
import { fetchproducts } from "../../../Redux/apiServices/productService";

const MainCover = styled.div`
    border-radius: 9px;
    background-color: white;
    opacity: 0.95;
    transform: scale(0.9);    
    font-family:  'NexaLight'!important;
    margin-left: -20px;
    min-height: 250px;
    display: flex;
    gap: 20px;
`;

const ButtonCover = styled.div`
    display: flex;
    flex-direction: row;
    flex: 0 0 auto;
    width: 25%;
    padding-top: 32px;
`;

const ButtonStyled = styled(Button)`
    margin: 4px;    
    background-color: gray !important;
    border-color: gray;
    max-height: 42px;

  &:hover {
    background-color: black !important;
    border-color: black;
    color: white;
  }
`;

const ErrorText = styled.div`
    color: red;
    font-size: 21px;
`;

const StyledMessage = styled.div`
  color: ${(props) => (props.status === 'N' ? 'red' : 'green')};
  font-size: 21px;
`;


export default function MapPartToProduct() {

    const [part, setPart] = useState('')
    const [product, setProduct] = useState('')
    const [error, setError] = useState(false)
    const [error1, setError1] = useState(false)
    const [error2, setError2] = useState(false)
    const [validated, setValidated] = useState(false)
    const [message, setMessage] = useState(false)
    const [status, setStatus] = useState('')

    let partList = useSelector((state) => state.parts.parts);
    let productList = useSelector((state) => state.products.products);


    const handleMappingService = (item) => {
        mapPart(item);
    };

    function handleMapping(event) {
        event.preventDefault();
        setError(false)
        setError1(false)
        setError2(false)
        if (!part || !product) {
            if (!part) {
                setError1(true)
            }
            if (!product) {
                setError2(true)
            }
            setError(true)
        } else {
            let item = {
                'partName': part,
                'productName': product,
                'message': setMessage,
                'status': setStatus

            }
            handleMappingService(item)
        }
    }

    function handleReset(event) {
        event.preventDefault();
        setPart('')
        setProduct('')
        setMessage('')
        setError(false)
        setError1(false)
        setError2(false)
    }

    return (
        <MainCover>
            {partList && productList
                ?
                <>
                    <DropDownUnit
                        label='Product'
                        placeholder='product'
                        value={product}
                        setValue={setProduct}
                        list={productList}
                        error={error2}
                        propertyName='product'
                        size='3'
                    />
                    <DropDownUnit
                        label='Part'
                        placeholder='Part Name'
                        value={part}
                        setValue={setPart}
                        list={partList}
                        error={error1}
                        propertyName='partName'
                        size='3'
                    />
                </>
                :
                <>
                    Loading....
                </>

            }

            <Form noValidate validated={validated} >
                <Row className="mb-3">
                    <ButtonCover md="6">
                        <ButtonStyled
                            type="submit"
                            onClick={(e) => handleMapping(e)}
                        >
                            Update
                        </ButtonStyled>
                        <ButtonStyled
                            type="submit"
                            onClick={(e) => handleReset(e)}
                        >
                            Reset
                        </ButtonStyled>

                    </ButtonCover>


                </Row>

                {
                    error ?
                        <ErrorText>
                            Please filled both the fields
                        </ErrorText>
                        :
                        <StyledMessage status={status}>
                            {message}
                        </StyledMessage>
                }
            </Form>
        </MainCover>
    )
}