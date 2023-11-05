import { useState } from 'react'
import { FormUnitText } from '../Components/ReuseableComponent/FormUnit'
import { DropDownUnit2 } from '../Components/ReuseableComponent/DropDownUnit'
import imageAddress from '../Assets/LoginPage/bck1.jpg'
import styled from 'styled-components'
import { Button } from 'react-bootstrap';

const Bodywrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: stretch;
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



export default function UserMaster() {

    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [userName, setUserName] = useState('')
    const [emailId, setEmailId] = useState('')
    const [role, setRole] = useState('')

    const roleList = [
        'SalesPerson', 'Admin', 'SuperAdmin'
    ]

    return (
        <ComponentWraper>
            <div style={{ 'padding': '15px' }}>
                <ComponentBodyWraper>
                    <UnitWrap>
                        Register User
                    </UnitWrap>

                    <Bodywrapper>
                        <FormUnitText
                            label="First Name"
                            value={fName}
                            setValue={setFName}
                            error={false}
                            errorMessage={false}
                            size='2'
                        />
                        <FormUnitText
                            label="Last Name"
                            value={lName}
                            setValue={setLName}
                            error={false}
                            errorMessage={false}
                            size='2'
                        />
                        <FormUnitText
                            label="Username"
                            value={userName}
                            setValue={setUserName}
                            error={false}
                            errorMessage={false}
                            size='2'
                        />
                        <FormUnitText
                            label="Email Id"
                            value={emailId}
                            setValue={setEmailId}
                            error={false}
                            errorMessage={false}
                            size='2'
                        />
                        <DropDownUnit2
                            label='Role'
                            placeholder='Role'
                            value={role}
                            setValue={setRole}
                            list={roleList}
                            error={false}
                            size='2'
                            disable={false}
                        />
                    </Bodywrapper>
                    <ButtonWrap>
                        <ButtonStyled>Register</ButtonStyled>
                        <ButtonStyled>Clear</ButtonStyled>
                    </ButtonWrap>
                </ComponentBodyWraper>


            </div>
        </ComponentWraper>

    )
}