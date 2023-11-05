import { Row } from "react-bootstrap";
import PartUnitWithCheck from "../ReuseableComponent/DisplayUnitWithCheck";
import DisplayUnit from "../ReuseableComponent/DisplayUnit";
import { useState } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
    display: flex;
    justify-content: flex-end; 
    `;

export default function PartsShowUnit({ part, setPart }) {


    // Create a state variable to store the checked state of each item
    const [itemStates, setItemStates] = useState(() => {
        const initialState = {};
        part.forEach((item) => {
            initialState[`partPrice_${item.id}`] = true;
            initialState[`installation_${item.id}`] = true;
            initialState[`uninstallation_${item.id}`] = true;
            initialState[`hauloff_${item.id}`] = true;
        });
        return initialState;
    });

    // Handle checkbox change
    const handleCheckboxChange = (key) => {
        setItemStates((prevState) => ({
            ...prevState,
            [key]: !prevState[key], // Toggle the checkbox state
        }));
    };

    const calculateTotalSums = () => {
        const totalSums = [];

        part.forEach((part) => {
            let totalSum = 0;

            if (itemStates[`partPrice_${part.id}`]) {
                totalSum += part.partPrice;
            }
            if (itemStates[`installation_${part.id}`]) {
                totalSum += part.installation;
            }
            if (itemStates[`uninstallation_${part.id}`]) {
                totalSum += part.unInstallation;
            }
            if (itemStates[`hauloff_${part.id}`]) {
                totalSum += part.haulOff;
            }
            totalSums.push(totalSum); // Add the total sum for this part to the array
        });


        return totalSums;
    };



    let sum = calculateTotalSums()

    const TotalSum = sum.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);

    setPart(TotalSum)
    let index = -1;


    return (

        <>
            {part && part.map((part) => (

                < div key={part.id} >
                    < Row className="mb-3" key={part.id} >
                        <DisplayUnit
                            label='Part'
                            placeholder="Name"
                            unitValue={part.partName}
                            size='2'
                        />
                        <PartUnitWithCheck
                            showCheck={true}
                            check={itemStates[`partPrice_${part.id}`]}
                            setCheck={() => handleCheckboxChange(`partPrice_${part.id}`)}
                            label='Part Price $'
                            placeholder="Price"
                            unitValue={part.partPrice}
                            size='2'
                        />
                        <PartUnitWithCheck
                            showCheck={true}
                            check={itemStates[`installation_${part.id}`]}
                            setCheck={() => handleCheckboxChange(`installation_${part.id}`)}
                            label='Part Install $'
                            placeholder="Install"
                            unitValue={part.installation}
                            size='2'
                        />
                        <PartUnitWithCheck
                            showCheck={true}
                            check={itemStates[`uninstallation_${part.id}`]}
                            setCheck={() => handleCheckboxChange(`uninstallation_${part.id}`)}
                            label='Part Uninstall $'
                            placeholder="Uninstall"
                            unitValue={part.unInstallation}
                            size='2'
                        />
                        <PartUnitWithCheck
                            showCheck={true}
                            check={itemStates[`hauloff_${part.id}`]}
                            setCheck={() => handleCheckboxChange(`hauloff_${part.id}`)}
                            label='Part Hauloff $'
                            placeholder="Hauloff"
                            unitValue={part.haulOff}
                            size='2'
                        />
                        <DisplayUnit
                            label='Total Part cost'
                            placeholder="TotalPartscost"
                            unitValue={sum[index += 1]}
                            size='2'
                        />
                    </Row >
                </div >
            ))
            }
            {part.length > 0 &&
                <StyledDiv>
                    <DisplayUnit
                        label='All Parts cost'
                        placeholder="TotalPartscost"
                        unitValue={TotalSum}
                        size='2'
                    />
                </StyledDiv>
            }

        </>
    )

}