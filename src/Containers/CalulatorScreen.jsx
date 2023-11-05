import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { Alert, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { BrowserView, MobileView, TabletView, isBrowser, isMobile, isTablet } from 'react-device-detect';
import './StyleSheet/CalculatorScreen.css';
import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import DisplayUnitWithCheck from '../Components/ReuseableComponent/DisplayUnitWithCheck';
import DisplayUnit from '../Components/ReuseableComponent/DisplayUnit';
import DropDownUnit from '../Components/ReuseableComponent/DropDownUnit';
import FormUnit from '../Components/ReuseableComponent/FormUnit';
import PartsShowUnit from '../Components/CalculatorUnits/PartsShow';


const apiUrl = process.env.REACT_APP_API_URL

function createData(category, subcategory, product, zipcode, miles, chargableMiles, installation, uninstallation, haulOff, purchasePrice, miscellaneousPrice, parts, cost) {
  return { category, subcategory, product, zipcode, miles, chargableMiles, installation, uninstallation, haulOff, purchasePrice, miscellaneousPrice, parts, cost };
}
const rows = [
  createData()
];

function isEmpty(value) {
  return value.length === 0;
}

function Cal() {
  const componentRef = useRef();

  //input fields
  const [product, setProduct] = useState(null);
  const [purchasePrice, setPurchasePrice] = useState(null);
  const [miscellaneousPrice, setMiscellaneousPrice] = useState('');
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [subCategory1, setSubCategory1] = useState(null);
  const [zipCode, setZipCode] = useState(null);


  //set checks
  const [check, setCheck] = useState(true);
  const [checkun, setCheckUn] = useState(true);
  const [checkhf, setCheckhf] = useState(true);

  //set show checkbox
  const [showCheckBox, setShowCheckBox] = useState(false)
  const [showCheckBoxUn, setShowCheckBoxUn] = useState(false)
  const [showCheckBoxHf, setShowCheckBoxHf] = useState(false)

  //set items
  const [items, setItems] = useState([]);
  const validated = false;

  //Total Cost  
  const [applianceCost, setApplianceCost] = useState(0);
  const [furnitureCost, setFurnitureCost] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(null);
  const [showCost, setShowCost] = useState(false);

  let appCost = 0;
  let furcost = 0;

  //get from calls
  const [zipcodeData, setZipCodeData] = useState([])
  const [miles, setMiles] = useState(null);
  const [chargableMiles, setChargableMiles] = useState(0);
  const [inst, setInst] = useState(null);
  const [uninst, setUninst] = useState(null);
  const [hauloff, sethauloff] = useState(null);
  const [cost, setCost] = useState(null);
  const [discountedCost, setDiscountedCost] = useState(null);
  const [partsEntity, setPartsEntity] = useState(null);
  const [parts, setParts] = useState(null);

  //get from product calls
  const [categoriesList, setCategoriesList] = useState([])
  const [subCategoriesList, setSubCategoriesList] = useState([])
  const [subCategoriesList1, setSubCategoriesList1] = useState([])
  const [productList, setProductList] = useState([])

  //field check
  const [showSubField, setShowSubField] = useState(false)
  const [showAppField, setShowAppField] = useState(false)
  const [showSubField_1, setShowSubField_1] = useState(false)

  //error n alert checks
  const [showAlert, setShowAlert] = useState(false)
  const [error, setError] = useState(false);

  //dropdown restrictions
  const [dropDown, setDropDown] = useState(true)
  const [dropDown1, setDropDown1] = useState(true)


  //lock dropdown
  const [prod, setPro] = useState(false)
  const [subCat, setSubCat] = useState(false)
  const [Cat, setCat] = useState(false)

  //for Purchase price field
  const [showPP, setShowPP] = useState(false)

  //utility
  const [minPurchVal, setMinPurchVal] = useState('')
  const [minMiles, setMinMiles] = useState('')

  // parts handelling

  // ****************************************
  // new data handling

  const [isZipError, setIsZipError] = useState(false);
  const [isCategoryError, setIsCategoryError] = useState(false)
  const [isSubCategoryError, setIsSubCategoryError] = useState(false)
  const [isProductError, setIsProductEError] = useState(false)

  const [isCategory, setIsCategory] = useState(false)
  const [isSubCategory, setIsSubCategory] = useState(false)
  const [isProductSelected, setIsProductSelected] = useState(false)



  useEffect(() => {
    if (!zipCode) {
      setCost('');
      setMiles('')
    }
  }, [zipCode])
  useEffect(() => {
    if (category === 'Appliance') {
      setIsSubCategory(true)
      setIsAppliance(true)
    }
    if (category !== 'Appliance') {
      setIsSubCategory(false)
      setIsAppliance(false)
    }
    if (category) {
      setIsCategory(true)
    }
    if (!category) {
      setIsCategory(false)
      setIsProductSelected(false)
      setIsProductSelected(false)
      setProduct(null)
      setIsAppliance(false)
    }
  }, [category])
  useEffect(() => {
    if (product) {
      setIsProductSelected(true)
      setShowCheckBox(true)
      setShowCheckBoxUn(true)
      setShowCheckBoxHf(true)
    }
    if (!product) {
      setIsProductSelected(false)
      setIsProductSelected(false)
      setShowCheckBox(false)
      setShowCheckBoxUn(false)
      setShowCheckBoxHf(false)
      setInst('')
      setUninst('')
      sethauloff('')
      setCost('')
      setDiscountedCost('')
      setParts('')
      setPartsEntity('')
      setPurchasePrice('')
      setMiscellaneousPrice('')
    }
  }, [product])
  // *******************************************************



  // Axios calls for getting Data
  //Get ZipData call
  const getZipCodeDataCall = () => {
    axios
      .get(`${apiUrl}/zips`)
      .then(data => setZipCodeData(data.data))
      .catch(error => error);
  };

  //Get miles call (After ZipData call)
  const getMilesDataCall = (() => {
    axios
      .get(`${apiUrl}/zips/${zipCode}`)
      .then(data => [setMiles(data.data.miles), setCost(data.data.totalCost), setDiscountedCost(data.data.costOfFreeMile)])
      .catch(error => error);
  })

  // Get All-Categories
  const getCategoriesListCall = () => {
    axios
      .get(`${apiUrl}/topcategory`)
      .then(data => setCategoriesList(data.data))
      .catch(error => error);
  };

  // Get Sub-Categories
  const getSubCategoryCall = ((data) => {
    axios
      .get(`${apiUrl}/childcategory/${data}`)
      .then(data => {

        console.log('==>xcv', data)
        if (data.data.categoryResponse !== null) {
          setSubCategoriesList(data.data.categoryResponse)
        }
        else {
          if (!subCategory) {
            setDropDown(false)
          }
          setProductList(data.data.productEntity)
        }
      })
      .catch(error => error);
  })

  // Get Sub-Categories 1
  const getSubCategory1Call = ((data) => {
    axios
      .get(`${apiUrl}/childcategory/${data}`)
      .then(data => {
        if (data.data.categoryResponse !== null) {
          setSubCategoriesList1(data.data.categoryResponse)
        }
        else {
          if (!subCategory1) {
            setDropDown1(false)
          }
          setProductList(data.data.productEntity)
        }
      })
      .catch(error => error);
  })



  //Get product details call when product selected
  const getProductDataCall = ((data) => {
    axios
      .get(`${apiUrl}/products/${data}`)
      .then(data => [
        setInst(data.data.installation),
        setUninst(data.data.unInstallation),
        sethauloff(data.data.haulOff),
        setPartsEntity(data.data.partEntity)
      ])
      .catch(error => error);
  })

  // GET All Utility data, extra min cost
  const getUtilityDataCall = ((data) => {
    axios
      .get(`${apiUrl}/utility`)
      .then(data => [setMinPurchVal(data.data[4].value), setMinMiles(data.data[5].value)
      ])
      .catch(error => error);
  })

  // GET All Utility data, extra min cost
  const postUtilityDataCall = ((data) => {
    axios
      .post(`${apiUrl}/utility`)
      .then(data => data)
      .catch(error => error);
  })

  // make a ZipData , categories & utility call onload
  useEffect(() => {
    postUtilityDataCall()
    getUtilityDataCall()
    if (isEmpty(zipcodeData)) {
      getZipCodeDataCall()
    }
    if (isEmpty(categoriesList)) {
      getCategoriesListCall()
    }
  }, [])
  // safe calls
  useEffect(() => {
    if (isEmpty(zipcodeData)) {
      getZipCodeDataCall()
    }
  }, [zipCode])
  useEffect(() => {
    if (isEmpty(categoriesList)) {
      getCategoriesListCall()
    }
  }, [category])

  // make a get miles data call after zip is selected 
  useEffect(() => {
    if (zipCode) {
      getMilesDataCall(zipCode)
    }
  }, [zipCode])

  // make a get Sub categories call after category is selected 
  useEffect(() => {
    if (category) {
      getSubCategoryCall(category)
    }
  }, [category])

  //get sub-category 1
  useEffect(() => {
    if (subCategory) {
      getSubCategory1Call(subCategory)
    }
  }, [subCategory])

  // make call to get product list
  useEffect(() => {
    if (!subCategory1) {
      getSubCategoryCall(subCategory)
    } else {
      getSubCategoryCall(subCategory1)
    }
  }, [subCategory, subCategory1])

  //get product Data when product selected
  useEffect(() => {
    if (product) {
      getProductDataCall(product)
    }
  }, [product])

  // Add the data in row table by clicking on add button
  const handleAddButtonClick = (event) => {
    event.preventDefault();
    if (category && zipCode) {
      const newItem = {
        itemCategory: category,
        itemSubCategory: subCategory,
        itemName: product,
        itemCost: !freeDilvery ? cost : updatedCost,
        itemPurchasePrice: purchasePrice ? purchasePrice : 0,
        itemMiscellaneousPrice: miscellaneousPrice ? parseFloat(miscellaneousPrice) : 0,
        itemParts: parts ? parts : 0,
        itemZipCode: zipCode,
        itemMiles: miles,
        itemChargableMiles: freeDilvery ? chargableMiles : miles,
        itemInst: check ? (inst) : (0),
        itemUninst: checkun ? (uninst) : (0),
        itemhauloff: checkhf ? (hauloff) : (0),
      };

      const newItems = [...items, newItem];

      if (newItem.itemCategory === 'Appliance') {
        appCost =
          parseFloat(applianceCost) +
          parseFloat(newItem.itemCost) +
          parseFloat(newItem.itemInst) +
          parseFloat(newItem.itemUninst) +
          parseFloat(newItem.itemhauloff) +
          parseFloat(newItem.itemParts) +
          parseFloat(newItem.itemMiscellaneousPrice)
        setApplianceCost(appCost);
      } else {
        furcost =
          parseFloat(furnitureCost) +
          parseFloat(newItem.itemCost) +
          parseFloat(newItem.itemInst) +
          parseFloat(newItem.itemUninst) +
          parseFloat(newItem.itemhauloff) +
          parseFloat(newItem.itemParts) +
          parseFloat(newItem.itemMiscellaneousPrice)
        setFurnitureCost(furcost);
      }

      const totalItemCount = newItems.reduce((total, item) => {
        return total + (item.itemCost + item.itemInst + item.itemUninst + item.itemhauloff + item.itemParts + item.itemMiscellaneousPrice);
      }, 0);


      setTotalItemCount(totalItemCount);


      setItems(newItems);
      setProduct(null);
      setCategory(null)
      setSubCategory(null)
      setSubCategory1(null)
      setZipCode(null)
      setMiles('')
      setChargableMiles('')
      setInst('')
      setUninst('')
      sethauloff('')
      setParts('')
      setPartsEntity('')
      setPurchasePrice('')
      setMiscellaneousPrice('')
      setCost('')
      setDiscountedCost('')
      setShowCost(true)
      setShowCheckBox(false)
      setShowCheckBoxUn(false)
      setShowCheckBoxHf(false)
      setCheck(true)
      setCheckUn(true)
      setCheckhf(true)
      setError(false)
      setShowAlert(true)
      setDropDown(true)
      setDropDown1(true)
      setShowSubField(false)
      setShowAppField(false)
      setShowSubField_1(false)
      setPro(false)
      setShowPP(false)
      setSubCat(false)
      setCat(false)
      setIsAppliance(false)
    } else {
      setError(true)
      setShowAlert(true)
    }
  }
  // Delete function when clicked on remove
  const handleDelete = (index, e) => {
    e.preventDefault();
    const thisCost = (items[index].itemCost + items[index].itemInst + items[index].itemUninst + items[index].itemhauloff + items[index].itemParts + items[index].itemMiscellaneousPrice)
    if (items.length < 2) {
      setShowCost(false)
    }

    setItems(items.filter((item, i) => i !== index));
    setTotalItemCount(totalItemCount - thisCost);

    if (items[index].itemCategory === 'Appliance') {
      setApplianceCost(applianceCost - thisCost);
    } else {
      setFurnitureCost(furnitureCost - thisCost);
    }
    setShowAlert(false)
  }
  // Reset function when clicked on Reset
  const handleReset = (event) => {
    event.preventDefault();
    setProduct(null);
    setCategory(null)
    setSubCategory(null)
    setSubCategory1(null)
    setZipCode(null)
    setMiles('')
    setChargableMiles('')
    setInst('')
    setUninst('')
    sethauloff('')
    setCost('')
    setDiscountedCost('')
    setParts('')
    setPartsEntity('')
    setPurchasePrice('')
    setMiscellaneousPrice('')
    setShowCheckBox(false)
    setShowCheckBoxUn(false)
    setShowCheckBoxHf(false)
    setCheck(true)
    setCheckUn(true)
    setCheckhf(true)
    setShowAlert(false)
    setDropDown(true)
    setDropDown1(true)
    setShowSubField(false)
    setShowAppField(false)
    setShowSubField_1(false)
    setPro(false)
    setShowPP(false)
    setSubCat(false)
    setCat(false)
    setIsAppliance(false)

  }

  // update the data field dynamically
  useEffect(() => {
    if (showPP) {
      setShowCheckBox(true)
      setShowCheckBoxUn(true)
      setShowCheckBoxHf(true)
    }
  }, [showPP]);

  // Free delivery scenario
  // Free delivery scenario
  const [isAppliance, setIsAppliance] = useState(false)
  var freeDilvery = false;
  if (isAppliance && purchasePrice > minPurchVal && miles > minMiles) {
    freeDilvery = true;
  }
  // handeling delivery cost
  useEffect(() => {
    setChargableMiles(parseFloat(miles - minMiles).toFixed(2))
  }, [miles])

  let updatedCost = 0;
  if (cost > discountedCost) {
    updatedCost = cost - discountedCost
  }

  // **************


  return (
    <div className='desktopCover'>
      <div className='mainDash'>
        <div className='namestyled1'>Lets calculate the delivery cost</div>
        <Form noValidate validated={validated}>
          <Row className="mb-3">
            <DropDownUnit
              label='ZipCode'
              placeholder='ZipCode'
              value={zipCode}
              setValue={setZipCode}
              list={zipcodeData}
              error={isZipError}
              propertyName='zip'
              size='2'
            />
            <DropDownUnit
              label='Category'
              placeholder='Category'
              value={category}
              setValue={setCategory}
              list={categoriesList}
              error={isCategoryError}
              propertyName='category'
              size='2'
              disable={category && product}
            />
            {isCategory && isAppliance &&
              < DropDownUnit
                label={category}
                placeholder={category}
                value={product}
                setValue={setProduct}
                list={productList}
                error={isProductError}
                propertyName='product'
                size='3'
              />
            }

            {isCategory && !isAppliance &&
              <>
                < DropDownUnit
                  label='Sub Category'
                  placeholder='Sub Category'
                  value={subCategory}
                  setValue={setSubCategory}
                  list={subCategoriesList}
                  error={isSubCategoryError}
                  propertyName='category'
                  size='2'
                  disable={category && product}
                />
                {
                  subCategory &&
                  < DropDownUnit
                    label={category}
                    placeholder={category}
                    value={product}
                    setValue={setProduct}
                    list={productList}
                    error={isProductError}
                    propertyName='product'
                    size='2'
                  />
                }
              </>
            }


            {isProductSelected && (
              <>
                < FormUnit
                  label="Purchase Amountt $"
                  value={purchasePrice}
                  setValue={setPurchasePrice}
                  error={false}
                  errorMessage={false}
                  size='2'
                />
                < FormUnit
                  label="Misc Amountt $"
                  value={miscellaneousPrice}
                  setValue={setMiscellaneousPrice}
                  error={false}
                  errorMessage={false}
                  size='2'
                />
              </>
            )

            }
          </Row>
          <Row className="mb-3">
            {freeDilvery ? (
              <>
                <DisplayUnit
                  label="Miles"
                  placeholder="Miles"
                  unitValue={miles}
                  size='2'
                />
                <DisplayUnit
                  label="Chargable Miles"
                  placeholder="ChargableMiles"
                  unitValue={chargableMiles}
                  size='2'
                />
              </>) : (
              <DisplayUnit
                label="Miles"
                placeholder="Miles"
                unitValue={miles}
                size='2'
              />
            )}

            <DisplayUnitWithCheck
              showCheck={showCheckBox}
              check={check}
              setCheck={setCheck}
              label='Install $'
              placeholder="Installation"
              unitValue={inst}
              size='2'
            />
            <DisplayUnitWithCheck
              showCheck={showCheckBoxUn}
              check={checkun}
              setCheck={setCheckUn}
              label='Uninstall $'
              placeholder="Uninstallation"
              unitValue={uninst}
              size='2'
            />
            <DisplayUnitWithCheck
              showCheck={showCheckBoxHf}
              check={checkhf}
              setCheck={setCheckhf}
              label='Hauloff $'
              placeholder="Hauloff"
              unitValue={hauloff}
              size='2'
            />
            <DisplayUnit
              label="Delivery cost$"
              placeholder="Delivery Cost"
              unitValue={!freeDilvery ? cost : updatedCost}
              size='2'
            />
          </Row>

          {/* parts  */}

          {isAppliance && partsEntity &&
            <PartsShowUnit
              part={partsEntity}
              setPart={setParts}
            />
          }


          {freeDilvery && <Alert severity="warning" className='AlertStyled'>You're eligible for free delivery for first {minMiles} miles, discounted delivery cost of above Appliance is <strong>$ </strong><strong className='strikeOut'>{cost}</strong>  <strong>  $ {updatedCost}</strong></Alert>}
          <BrowserView>
            <Stack spacing={1} direction="row" className="cal-res-buttonstyled-bckgrd">
              {showAlert ?
                (<>
                  {error ?
                    <Alert severity="error" className='AlertStyled'>Please fill the requried fields [Zipcode, Catergory, Sub-Categories(If Any) and product]</Alert>
                    :
                    <Alert severity="success" className='AlertStyled'>Your data was successfully added — check it out!</Alert>
                  } </>)
                :
                <Alert severity="info" className='AlertStyled'> Please select Zipcode, Catergory, SubCatergory[if any], and product</Alert>}

              <Button variant="contained" type="submit" onClick={handleReset} className='cal-res-buttonstyled'>Reset</Button>
              <Button variant="contained" type="submit" onClick={handleAddButtonClick} className='cal-res-buttonstyled'>Add</Button>
              <ReactToPrint
                trigger={() => <Button variant="contained" className='cal-res-buttonstyled'>Print</Button>}
                content={() => componentRef.current}
              />
            </Stack>
          </BrowserView>


          <TabletView>
            <Stack spacing={1} direction="row" className="cal-res-buttonstyled-bckgrd">
              {showAlert ?
                (<>
                  {error ?
                    <Alert severity="error" className='AlertStyled'>Please fill the requried fields [Zipcode, Catergory, Sub-Categories(If Any) and product]</Alert>
                    :
                    <Alert severity="success" className='AlertStyled'>Your data was successfully added — check it out!</Alert>
                  } </>)
                :
                <Alert severity="info" className='AlertStyled'>Please select product before category</Alert>}
              <Button variant="contained" type="submit" onClick={handleReset} className='cal-res-buttonstyled'>Reset</Button>
              <Button variant="contained" type="submit" onClick={handleAddButtonClick} className='cal-res-buttonstyled'>Add</Button>
              <ReactToPrint
                trigger={() => <Button variant="contained" className='cal-res-buttonstyled'>Print</Button>}
                content={() => componentRef.current}
              />
            </Stack>
          </TabletView>
          {!isTablet &&
            <MobileView>
              <Stack spacing={1} direction="row" className="cal-res-buttonstyled-bckgrd"
                style={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                {showAlert ?
                  (<>
                    {error ?
                      <Alert severity="error" className='AlertStyled'>Please fill the requried fields [Zipcode, Catergory, Sub-Categories(If Any) and product]</Alert>
                      :
                      <Alert severity="success" className='AlertStyled'>Your data was successfully added — check it out!</Alert>
                    } </>)
                  :
                  <Alert severity="info" className='AlertStyled'>Please select product before category</Alert>}
                <div className='mobile-button-div'>
                  <Button variant="contained" type="submit" onClick={handleReset} className='cal-res-buttonstyled' style={{ width: '30%' }}>Reset</Button>
                  <Button variant="contained" type="submit" onClick={handleAddButtonClick} className='cal-res-buttonstyled' style={{ width: '30%' }}>Add</Button>
                  <ReactToPrint
                    trigger={() => <Button variant="contained" className='cal-res-buttonstyled' style={{ width: '30%' }}>Print</Button>}
                    content={() => componentRef.current}
                  />
                </div>
              </Stack>
            </MobileView>
          }
          <div ref={componentRef}>
            <Row className='printHead'>
              <Form.Group as={Col} md="4">
                <Form.Label >Customer Name</Form.Label>
                <Form.Control type="text" placeholder="Customer Name" />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label >Customer Contact</Form.Label>
                <Form.Control type="number" placeholder="Customer Contact" />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label >Invoice Number</Form.Label>
                <Form.Control type="text" placeholder="Invoice Number" />
              </Form.Group>
            </Row>
            <div className='tableCover' >
              <TableContainer component={Paper} className='scrollitheight'  >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead >
                    <TableRow className='tablehead' >
                      <TableCell align="center" className='fontcolor'>Category</TableCell>
                      <TableCell align="center" className='fontcolor'>Product</TableCell>
                      <TableCell align="center" className='fontcolor'>Purchase Amountt $</TableCell>
                      <TableCell align="center" className='fontcolor'>Misc Amount $</TableCell>
                      <TableCell align="center" className='fontcolor'>ZipCode</TableCell>
                      <TableCell align="center" className='fontcolor'>Miles</TableCell>
                      <TableCell align="center" className='fontcolor'>Chargable Miles</TableCell>
                      <TableCell align="center" className='fontcolor'>Install $</TableCell>
                      <TableCell align="center" className='fontcolor'>Uninstall $</TableCell>
                      <TableCell align="center" className='fontcolor'>Hauloff $</TableCell>
                      <TableCell align="center" className='fontcolor'>Parts $</TableCell>
                      <TableCell align="center" className='fontcolor'>Delivery Cost $</TableCell>
                      <TableCell align="center" className='fontcolor'>Remove</TableCell>
                    </TableRow>
                  </TableHead>
                  {items.map((item, index) => (
                    <>
                      {rows.map((row) => (
                        <TableBody  >
                          <TableRow
                            key={row.zipcode}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell align="center">
                              {item.itemCategory}
                            </TableCell>
                            <TableCell align="center">
                              {item.itemName}
                            </TableCell>
                            <TableCell align="center">
                              <>{item.itemPurchasePrice}</>
                            </TableCell>
                            <TableCell align="center">
                              <>{item.itemMiscellaneousPrice}</>
                            </TableCell>
                            <TableCell align="center">
                              <>{item.itemZipCode}</>
                            </TableCell>
                            <TableCell align="center">{item.itemMiles}</TableCell>
                            <TableCell align="center">{item.itemChargableMiles}</TableCell>
                            <TableCell align="center">{item.itemInst}</TableCell>
                            <TableCell align="center">{item.itemUninst}</TableCell>
                            <TableCell align="center">{item.itemhauloff}</TableCell>
                            <TableCell align="center">{item.itemParts}</TableCell>
                            <TableCell align="center">{item.itemCost}</TableCell>
                            <TableCell align="center"><button onClick={(e) => [handleDelete(index, e)]}>Remove</button></TableCell>
                          </TableRow>
                        </TableBody>
                      ))}
                    </>
                  ))}
                </Table>
              </TableContainer>
            </div>
            {showCost &&
              <>
                <div>
                  {applianceCost > 0 &&
                    <div className='showCost2'>
                      <span>Appliances delivery cost : $ {parseFloat(applianceCost).toFixed(2)}</span>
                    </div>}
                  {furnitureCost > 0 &&
                    <div className='showCost2'>
                      <span>Furniture delivery cost : $ {parseFloat(furnitureCost).toFixed(2)}</span>
                    </div>}
                </div>
                <div className='showCost'>Your Total delivery cost will be $ {parseFloat(totalItemCount).toFixed(2)} </div>
              </>}
          </div>
          {<Alert severity="warning" className='AlertStyled'>NOTE: Free delivery for Appliance upto {minMiles} miles with minimum purchase of ${minPurchVal}</Alert>}
        </Form>
      </div>
    </div>
  );
}

export default Cal;