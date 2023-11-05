import { useState } from 'react'
import { FormUnitText } from '../Components/ReuseableComponent/FormUnit'
import { DropDownUnit2 } from '../Components/ReuseableComponent/DropDownUnit'
import imageAddress from '../Assets/LoginPage/bck1.jpg'
import styled from 'styled-components'
import { Button } from 'react-bootstrap';

const Bodywrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    -webkit-box-align: stretch;

    `;

const ButtonStyled = styled(Button)`
    background-color: gray !important;
    border: none;

    &:hover {
        background-color: black !important;
    }
`;

const UnitWrap = styled.div`
    display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    font-size: x-large;
    font-weight: 700;
    font-family: emoji;
    margin-left: 24px;
    padding: 10px 0px;
    `;

const ButtonWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 20px;
    padding: 10px 30px 10px 0px;
    `;

const ComponentWraper = styled.div`
    background-image: url(${imageAddress});
    background-size: cover; 
    background-repeat: no-repeat; 
    background-position: center center;
    `;

const ComponentBodyWraper = styled.div`
    background-color: white;
    border-radius: 15px;
    font-family: 'NexaLight'!important;
    `;



export default function ResetPassword() {


    const [emailId, setEmailId] = useState('')



    return (
        <ComponentWraper>
            <div style={{ 'padding': '15px' }}>
                <ComponentBodyWraper>
                    <UnitWrap>
                        Register Users
                    </UnitWrap>
                    <Bodywrapper>
                        <FormUnitText
                            label="Email Id"
                            value={emailId}
                            setValue={setEmailId}
                            error={false}
                            errorMessage={false}
                            size='2'
                        />
                    </Bodywrapper>
                    <ButtonWrap>
                        <ButtonStyled>Reset Password</ButtonStyled>
                    </ButtonWrap>
                </ComponentBodyWraper>


            </div>
        </ComponentWraper>

    )
}