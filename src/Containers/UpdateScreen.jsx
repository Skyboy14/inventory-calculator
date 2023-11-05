/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './StyleSheet/UpdateScreen.css';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Autocomplete, Modal, TextField } from '@mui/material';
import axios from 'axios';
// import ZipDataTable from './ZipCodeTable';
import Cat_mapping_file from './../Assets/sampleFile/Category_Mapping_Sample.xlsx'
import Product_file from './../Assets/sampleFile/Add_Product_sample.xlsx'
import Zipcode_file from './../Assets/sampleFile/Zipcode_Sample.xlsx'
import AddParts from '../Components/Units/CreateParts/AddParts';
import MapPartToProduct from '../Components/Units/MapParts/MapParts';
import { fetchproducts } from '../Redux/apiServices/productService';
import { getProducts } from '../Redux/actions/product_action';
import { useDispatch } from 'react-redux';


const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const apiUrl = process.env.REACT_APP_API_URL

function UpdateScreen() {
  const [expanded, setExpanded] = React.useState('panel1');
  // const [validated, setValidated] = useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  //1
  // const [openZip1, setOpenZip1] = useState(false);
  // const handleOpenZip1 = (event) => {event.preventDefault();setOpenZip1(true);}
  // const handleCloseZip1 = (event) => { event.preventDefault(); setOpenZip1(false); }
  // const [openUpZip1, setOpenUpZip1] = useState(false);
  // const handleOpenUpZip1 = (event) => {event.preventDefault(); setOpenUpZip1(true);}
  // const handleCloseUpZip1 = (event) => { event.preventDefault(); setOpenUpZip1(false); }

  //2 
  // const [openZip2, setOpenZip2] = useState(false);
  // const handleOpenZip2 = (event) => {event.preventDefault();setOpenZip2(true);}
  // const handleCloseZip2 = (event) => {event.preventDefault();setOpenZip2(false);}
  const [openUpZip2, setOpenUpZip2] = useState(false);
  const handleOpenUpZip2 = (event) => { event.preventDefault(); setOpenUpZip2(true); }
  const handleCloseUpZip2 = (event) => { event.preventDefault(); setOpenUpZip2(false); setCatMap_error(false), setCatMap_success(false) }

  //3
  const [openZip3, setOpenZip3] = useState(false);
  const handleOpenZip3 = (event) => { event.preventDefault(); setOpenZip3(true); }
  const handleCloseZip3 = (event) => { event.preventDefault(); setOpenZip3(false); }
  const [openUpZip3, setOpenUpZip3] = useState(false);
  const handleOpenUpZip3 = (event) => { event.preventDefault(); setOpenUpZip3(true); }
  const handleCloseUpZip3 = (event) => { event.preventDefault(); setOpenUpZip3(false); setUploadProduct_error(false), setUploadProduct_success(false) }

  //4
  const [openZip4, setOpenZip4] = useState(false);
  const handleOpenZip4 = (event) => { event.preventDefault(); setOpenZip4(true); }
  const handleCloseZip4 = (event) => { event.preventDefault(); setOpenZip4(false); }
  const [openUpZip4, setOpenUpZip4] = useState(false);
  const handleOpenUpZip4 = (event) => { event.preventDefault(); setOpenUpZip4(true); }
  const handleCloseUpZip4 = (event) => { event.preventDefault(); setOpenUpZip4(false); }

  //5
  const [openZip5, setOpenZip5] = useState(false);
  const handleOpenZip5 = (event) => { event.preventDefault(); setOpenZip5(true); }
  const handleCloseZip5 = (event) => { event.preventDefault(); setOpenZip5(false); }
  const [openUpZip5, setOpenUpZip5] = useState(false);
  const handleOpenUpZip5 = (event) => { event.preventDefault(); setOpenUpZip5(true); }
  const handleCloseUpZip5 = (event) => { event.preventDefault(); setOpenUpZip5(false); setUploadZip_error(false), setUploadZip_success(false) }

  //6
  const [openZip6, setOpenZip6] = useState(false);
  const handleOpenZip6 = (event) => { event.preventDefault(); setOpenZip6(true); }
  const handleCloseZip6 = (event) => { event.preventDefault(); setOpenZip6(false); }
  const [openUpZip6, setOpenUpZip6] = useState(false);
  const handleOpenUpZip6 = (event) => { event.preventDefault(); setOpenUpZip6(true); }
  const handleCloseUpZip6 = (event) => { event.preventDefault(); setOpenUpZip6(false); }

  ///
  const [openUpZip, setOpenUpZip] = useState(false);
  const handleOpenUpZip = (event) => { event.preventDefault(); setOpenUpZip(true); }
  const handleCloseUpZip = (event) => { event.preventDefault(); setOpenUpZip(false); }


  //create category
  const [category, setCategory] = useState(null);
  const [error_1, setError_1] = useState(false);
  const [validated_1, setValidated_1] = useState(false);
  const [categoryCreateError, setCategoryCreateError] = useState('')

  //Mapping category
  const [allCategoryList, setAllCategoryList] = useState([])
  const [primary_Cat, setPrimary_Cat] = useState(null);
  const [secondary_Cat, setSecondary_Cat] = useState(null);
  const [error_2, setError_2] = useState(false);
  const [validated_2, setValidated_2] = useState(false);

  // create Product
  const [baseCategoryList, setBaseCategoryList] = useState([])
  const [product_Cat, setProduct_Cat] = useState(null);
  const [base_Cat, setBase_Cat] = useState(null);
  const [install, setInstall] = useState(0);
  const [uninstall, setUninstall] = useState(0);
  const [hauloff, setHaulOff] = useState(0);
  const [error_3, setError_3] = useState(false);
  const [validated_3, setValidated_3] = useState(false);
  const [errorMessage_3, setErrorMessage_3] = useState('Please provide a valid Product Name')

  //Update Product
  const [error_4, setError_4] = useState(false);
  const [validated_4, setValidated_4] = useState(false);
  const [allProductList, setAllProductList] = useState([])
  const [product_Cat_U, setProduct_Cat_U] = useState(null);
  const [base_Cat_U, setBase_Cat_U] = useState(null);
  const [install_U, setInstall_U] = useState(null);
  const [uninstall_U, setUninstall_U] = useState(null);
  const [hauloff_U, setHaulOff_U] = useState(null);

  //Create ZipCode
  const [error_5, setError_5] = useState(false);
  const [validated_5, setValidated_5] = useState(false);
  const [zipcodeC, setZipcodeC] = useState(null)
  const [cityC, setCityC] = useState(null)
  const [milesC, setMilesC] = useState(null)
  const [zipcodeList, setZipCodeList] = useState([])
  const [errorMessage_5, setErrorMessage_5] = useState('')
  // const[vehicleChargeC, setVehicleChargeC] = useState(null)
  // const [laborChargeC, setLaborChargeC] = useState(null)

  //Update ZipCode
  const [error_6, setError_6] = useState(false);
  const [validated_6, setValidated_6] = useState(false);
  const [zipcodeU, setZipcodeU] = useState(null)
  const [cityU, setCityU] = useState(null)
  const [milesU, setMilesU] = useState(null)
  const [vehicleChargeU, setVehicleChargeU] = useState(null)
  const [laborChargeU, setLaborChargeU] = useState(null)

  //Update Utility
  const [error_7, setError_7] = useState(false);
  const [validated_7, setValidated_7] = useState(false);
  const [minDiliveryCharge, setMinDiliveryCharge] = useState(null)

  //create category and then update catogiries
  const createcategory = (e) => {
    e.preventDefault()
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (category && category.length >= 2) {
      setError_1(false)
      setValidated_1(true)
      axios.post(`${apiUrl}/category`, {
        categoryName: category,
        isActive: "Y"
      })
        .then((data) => {
          if (data.data.status !== 'N') {
            axios.get(`${apiUrl}/categories`)
              .then(data => [setAllCategoryList(data.data),])
              .catch(error => error)
            axios
              .get(`${apiUrl}/baseCategory`)
              .then(data => setBaseCategoryList(data.data))
              .catch(error => error)
            setCategoryCreateError(`Category created successfully`)
          } else {
            setError_1(true)
            setValidated_1(false)
            setCategoryCreateError(`can't create category, it is already created`)
          }
        })
        // Error: 
        .catch(error => error)
    } else {
      setError_1(true)
      setValidated_1(false)
      setCategoryCreateError('provide proper Catergory Name')
    }
  }

  // clear create category field
  const categoryField = document.getElementById("category");
  const clearbtn = document.getElementById("clear-btn");
  const clearcategoryField = (e) => {
    e.preventDefault();
    e.stopPropagation();
    clearbtn.addEventListener('click', () => {
      // clearing the input field
      categoryField.value = null;
      setCategory(null)
      setError_1(false)
      setValidated_1(false)
    })
  }

  //Clear Create product field
  const productCP = document.getElementById("ProductCP")
  const installCP = document.getElementById("InstallationCP");
  const uninstallCP = document.getElementById("uninstallationCP");
  const hauloffCP = document.getElementById("hauloffCP");
  const clearbtnCP = document.getElementById("clear-btn-CP");
  const clearCreateProduct = (e) => {
    e.preventDefault();
    clearbtnCP.addEventListener('click', () => {
      // clearing the input field
      productCP.value = null;
      installCP.value = null;
      uninstallCP.value = null;
      hauloffCP.value = null;
      setHaulOff(null)
      setUninstall(null)
      setInstall(null)
      setProduct_Cat(null)
      setBase_Cat(null)
      setError_3(false)
      setValidated_3(false)
      setErrorMessage_3('')
    })
  }

  //Clear update category field
  const installUP = document.getElementById("InstallationUP");
  const uninstallUP = document.getElementById("uninstallationUP");
  const hauloffUP = document.getElementById("hauloffUP");
  const clearbtnUP = document.getElementById("clear-btn-UP");
  const clearUpdateProduct = (e) => {
    e.preventDefault();
    clearbtnUP.addEventListener('click', () => {
      // clearing the input field
      installUP.value = null;
      uninstallUP.value = null;
      hauloffUP.value = null;
      setHaulOff_U(null)
      setUninstall_U(null)
      setInstall_U(null)
      setProduct_Cat_U(null)
      setBase_Cat_U(null)
      setCategory(null)
      setError_4(false)
      setValidated_4(false)
    })
  }

  //clear category mapping
  const clearcategoryMappingField = (e) => {
    e.preventDefault()
    setPrimary_Cat(null)
    setSecondary_Cat(null)
    setError_2(false)
    setValidated_2(false)
    setfeedbackMessageerror_2('')
  }

  const [feedbackMessageerror_2, setfeedbackMessageerror_2] = useState('');
  // create Category mapping
  const createCatMapping = (e) => {
    e.preventDefault()
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (primary_Cat !== secondary_Cat && secondary_Cat !== null) {

      axios.post(`${apiUrl}/categorymapping`, {
        primary: primary_Cat,
        secondary: secondary_Cat
      })
        .then(data => {
          if (data.data.status !== 'N') {
            setError_2(false)
            setfeedbackMessageerror_2(data.data.title)
            setValidated_2(true)
          }
          else {
            setError_2(true)
            setfeedbackMessageerror_2(data.data.title)
          }
        })
        .catch(error => error);
    } else {
      if (primary_Cat === null && secondary_Cat === null) {
        setfeedbackMessageerror_2('Please enter the value')
      } else if (primary_Cat === secondary_Cat) {
        setfeedbackMessageerror_2('Primary Category & Secondary Category Cant be same')
      } else if (secondary_Cat === null) {
        setfeedbackMessageerror_2('Enter Secondary Category')
      }
      setError_2(true)
    }
  }

  //Get All Category
  const getAllCategoryList = () => {
    axios
      .get(`${apiUrl}/categories`)
      .then(data => setAllCategoryList(data.data))
      .catch(error => error);
  };

  //Get Base Category
  const getBaseCategoryList = () => {
    axios
      .get(`${apiUrl}/baseCategory`)
      .then(data => setBaseCategoryList(data.data))
      .catch(error => error);
  };

  //Get All Product
  const getAllProductList = () => {
    axios
      .get(`${apiUrl}/products`)
      .then(data => setAllProductList(data.data))
      .catch(error => error);
  };

  // CreateProduct
  const createProduct = (e) => {
    e.preventDefault()
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    // let item = {
    //   baseCategory: base_Cat,
    //   productName: product_Cat,
    //   install: install,
    //   uninstall: install,
    //   hauloff: hauloff,
    // }
    if (product_Cat && base_Cat && install >= 0 && uninstall >= 0 && hauloff >= 0) {
      setError_3(false)
      setValidated_3(true)
      axios.post(`${apiUrl}/product`, {
        product: product_Cat,
        installation: install,
        hauloff: hauloff,
        categoryName: base_Cat,
        unInstallation: uninstall,
      })
        .then(data => {
          if (data.data.status === 'N') {
            setError_3(true), setValidated_3(false), setErrorMessage_3(data.data.title)
          }
          if (data.data.status === 'Y') {
            getAllProductList()
          }
        })
        .catch(error => [error, setError_3(true)]);
    } else {
      setError_3(true)
      setErrorMessage_3('Please enter proper values in all fields')
    }
  }

  // UpdateProduct
  const updateProduct = (e) => {
    e.preventDefault()
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (product_Cat_U && base_Cat_U && install_U >= 0 && uninstall_U >= 0 && hauloff_U >= 0) {
      setError_4(false)
      setValidated_4(true)
      axios.put(`${apiUrl}/product`, {
        product: product_Cat_U,
        installation: install_U,
        hauloff: hauloff_U,
        categoryName: base_Cat_U,
        unInstallation: uninstall_U,
      })
        .then(data => { if (data.data.status === 'N') { setError_4(true), setValidated_4(false), setErrorMessage_3(data.data.title) } })
        .catch(error => [error, setError_4(true)]);
    } else {
      setError_4(true)
    }
  }

  //Get All Zipcode
  const getAllZipcode = () => {
    axios
      .get(`${apiUrl}/zips`)
      .then(data => setZipCodeList(data.data))
      .catch(error => error);
  };

  //Create ZipCode
  const createZipcode = (e) => {
    e.preventDefault()
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (zipcodeC && cityC && milesC) {
      setError_5(false)
      setValidated_5(true)
      axios.post(`${apiUrl}/zip`, {
        zip: zipcodeC,
        city: cityC,
        miles: milesC,
      })
        .then(data => { if (data.data.status === 'N') { setError_5(true), setValidated_5(false), setErrorMessage_5(data.data.title) } })
        .catch(error => [error, setError_5(true)]);
    } else {
      setError_5(true)
      setErrorMessage_3('Please enter proper values')
    }
  }

  //clear create Zipcode
  const Create_Zipcode = document.getElementById("Create_Zipcode");
  const Create_city = document.getElementById("Create_city");
  const Create_miles = document.getElementById("Create_miles");
  const clearbtnCreateZip = document.getElementById("clear-btn-CreateZip");
  const resetCreateZipCode = (e) => {
    e.preventDefault();
    clearbtnCreateZip.addEventListener('click', () => {
      // clearing the input field
      Create_Zipcode.value = null;
      Create_city.value = null;
      Create_miles.value = null;
      setCityC(null);
      setZipcodeC(null);
      setMilesC(null)
      setError_5(false)
      setValidated_5(false)
      setErrorMessage_5('')
    })
  }


  //Update Zipcode
  const updateZipcode = (e) => {
    e.preventDefault()
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (zipcodeU && cityU && milesU) {
      setError_6(false)
      setValidated_6(true)
      axios.put(`${apiUrl}/zip`, {
        zip: zipcodeU,
        city: cityU,
        miles: milesU,
      })
        .then(data => data)
        .catch(error => [error, setError_6(true)]);
    } else {
      setError_6(true)
    }
  }

  // clear Update Zipcode
  const Update_Zipcode = document.getElementById("Update_Zipcode");
  const Update_city = document.getElementById("Update_city");
  const Update_miles = document.getElementById("Update_miles");
  const Update_vehicleCharge = document.getElementById("Update_vehicleCharge");
  const update_labor = document.getElementById("update_labor");
  const clearbtnUpdateZip = document.getElementById("clear-btn-UpdateZip");
  const resetUpdateZipCode = (e) => {
    e.preventDefault();
    clearbtnUpdateZip.addEventListener('click', () => {
      // clearing the input field
      Update_Zipcode.value = null;
      Update_city.value = null;
      Update_miles.value = null;
      Update_vehicleCharge.value = null;
      update_labor.value = null;
      setCityU(null);
      setZipcodeU(null);
      setMilesU(null)
      setVehicleChargeU(null)
      setLaborChargeU(null)
      setError_6(false)
      setValidated_6(false)
    })
  }

  //update utility
  const updateUtility = (e) => {
    e.preventDefault()
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (minDiliveryCharge !== null) {
      setError_7(false)
      setValidated_7(true)
      axios.put(`${apiUrl}/utility/minCharge/${minDiliveryCharge}`)
        .then(data => { if (data.data.status === 'N') { setError_7(true), setValidated_7(false) } })
        .catch(error => [error, setError_7(true)]);
    } else {
      setError_7(true)
    }
  }

  //clear utility
  const minDilveryCharge_utility = document.getElementById("minDiliveryCharge");;
  const clearbtnUtility = document.getElementById("clear-btn-Utility");
  const resetUpdateUtility = (e) => {
    e.preventDefault();
    clearbtnUtility.addEventListener('click', () => {
      // clearing the input field
      minDilveryCharge_utility.value = null;
      setMinDiliveryCharge(null)
      setError_7(false)
      setValidated_7(false)
    });
  }



  // upload Data code

  //1. upload zipcode file
  // const zipcode_file = document.getElementById("zipcode_file");
  // const zipcode_file_btn = document.getElementById("zipcode_file_btn");

  const [uploadZip_error, setUploadZip_error] = useState(false)
  const [zipcode_file1, setzipcode_file1] = useState(null)
  const [uploadZip_success, setUploadZip_success] = useState(false)

  function handleZipCodeFile(e) {
    setzipcode_file1(e.target.files[0])
    setUploadZip_error(false)
    setUploadZip_success(false)
  }
  function uploadZipcode_file(e) {
    e.preventDefault()
    setUploadZip_success(false)
    if (zipcode_file1 !== null) {
      const formData = new FormData();
      formData.append("file", zipcode_file1);
      axios.post(`${apiUrl}/zip/upload`, formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }).then(({ data }) => {
          if (data.status === 'Y') {
            [setUploadZip_error(false), getAllZipcode(), setzipcode_file1(null), setUploadZip_success(true)]
          }
          else {
            [setUploadZip_error(true), setzipcode_file1(null)]
          }
        })
        .catch(error => [setUploadZip_error(true), setzipcode_file1(null)]);
    } else {
      setUploadZip_error(true)

    }
  };

  const [catMap_error, setCatMap_error] = useState(false)
  const [catMap_file1, setCatMap_file1] = useState(null)
  const [catMap_success, setCatMap_success] = useState(false)

  function handleCatMapFile(e) {
    setCatMap_file1(e.target.files[0])
    setCatMap_error(false)
    setCatMap_success(false)
  }
  function uploadCatMap_file(e) {
    e.preventDefault()
    setCatMap_success(false)
    if (catMap_file1 !== null) {
      const formData = new FormData();
      formData.append("file", catMap_file1);
      axios.post(`${apiUrl}/categorymapping/upload`, formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }).then(({ data }) => {
          if (data.status === 'Y') {
            [setCatMap_error(false), getBaseCategoryList(), setCatMap_success(true), setCatMap_file1(null)]
          } else {
            [setCatMap_error(true), setCatMap_file1(null)]
          }
          console.log('akash', data)
        })
        .catch(error => [error, setCatMap_error(true), setCatMap_file1(null)]);
    } else {
      setCatMap_error(true)
    }
  };

  // 3. upload product file
  // const product_file = document.getElementById("product_file");
  // const product_file_btn = document.getElementById("product_file_btn");

  const [uploadProduct_error, setUploadProduct_error] = useState(false)
  const [product_file1, setProduct_file1] = useState(null)
  const [uploadProduct_success, setUploadProduct_success] = useState(false)

  function handleProductFile(e) {
    setProduct_file1(e.target.files[0])
    setUploadProduct_error(false)
    setUploadProduct_success(false)
  }
  function uploadProduct_file(e) {
    e.preventDefault()
    setUploadProduct_success(false)
    if (product_file1 !== null) {
      const formData = new FormData();
      formData.append("file", product_file1);
      axios.post(`${apiUrl}/product/upload`, formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }).then(data => {
          if (data.data.status === 'Y') {
            [(console.log('akash', data)), setUploadProduct_error(false), getAllProductList(), setUploadProduct_success(true), setProduct_file1(null)]
          }
          else {
            [(console.log('akash-1', data)), setUploadProduct_error(true), setProduct_file1(null)]
          }
        })
        .catch(error => [(console.log('akash-2', error)), error, setUploadProduct_error(true), setProduct_file1(null)]);
    } else {
      setUploadProduct_error(true)
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    getAllCategoryList()
    getBaseCategoryList()
    getAllProductList()
    dispatch(getProducts())
    getAllZipcode()
  }, [])



  useEffect(() => {
    if (product_Cat_U) {
      axios
        .get(`${apiUrl}/products/${product_Cat_U}`)
        .then(data => [setBase_Cat_U(data.data.categoryName), setInstall_U(data.data.installation), setUninstall_U(data.data.unInstallation), setHaulOff_U(data.data.haulOff)])
        .catch(error => error);
    }
  }, [product_Cat_U])

  useEffect(() => {
    if (zipcodeU) {
      axios
        .get(`${apiUrl}/zips/${zipcodeU}`)
        .then(data => [setCityU(data.data.city), setMilesU(data.data.miles), setVehicleChargeU(data.data.vehicleCharge), setLaborChargeU(data.data.laborCharge)])
        .catch(error => error);
    }
  }, [zipcodeU])



  return (
    <div className='desktopCoversingle'>
      <div className='DisplayTitle' style={{ color: 'white' }}>Update Appliances/Furniture And ZipCode</div>
      <div className='Accordian-Cover'>
        {/*Create Category */}
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Create category</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className='UpdateDataForm-create-category'>
              <Form noValidate validated={validated_1} >
                <Row className="mb-3">
                  <Form.Group as={Col} md="3" controlId="validationCustom01">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      id="category"
                      type="text"
                      placeholder="Category"
                      value={category}
                      required
                      onChange={(event) => setCategory(event.target.value)}
                      isInvalid={error_1}
                    />
                    <Form.Control.Feedback type="invalid">
                      {categoryCreateError}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">
                      {categoryCreateError}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className='updatebtnCoverZip' md="6">
                    <Button type="submit" className='buttonstyled' style={{ maxHeight: '36px' }} onClick={createcategory}>Update</Button>
                    <Button type="submit" className='buttonstyled' style={{ maxHeight: '36px' }} id='clear-btn' onClick={clearcategoryField}>Reset</Button>
                    {/* <Modal
                  open={openZip1}
                  onClose={handleCloseZip1}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <ZipDataTable/>
                </Modal> */}
                  </div>
                </Row>
              </Form>
            </div>
          </AccordionDetails>
        </Accordion>
        {/*Map Category */}
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Category Mapping</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className='UpdateDataForm-create-category'>
              <Form noValidate validated={validated_2} >
                <Row className="mb-3 CatRow">
                  <Form.Group as={Col} md="3" controlId="validationCustom01">
                    <Form.Label>Primary Category</Form.Label>
                    <Autocomplete
                      required
                      disablePortal
                      className="form-control ZipcodeSelector"
                      size="small"
                      options={allCategoryList.map((option) => option.category)}
                      sx={{ width: 150 }}
                      renderInput={(params) => <TextField {...params} error={error_2} label="Primary" required />}
                      value={[primary_Cat]}
                      onChange={(event, value) => setPrimary_Cat(value)}
                    />
                    <Form.Control.Feedback type="invalid" />
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="validationCustom01">
                    <Form.Label>Secondary</Form.Label>
                    <Autocomplete
                      required
                      disablePortal
                      className="form-control ZipcodeSelector"
                      size="small"
                      options={allCategoryList.map((option) => option.category)}
                      sx={{ width: 150 }}
                      renderInput={(params) => <TextField {...params} error={error_2} label="Secondary" required />}
                      value={[secondary_Cat]}
                      onChange={(event, value) => setSecondary_Cat(value)}
                    />
                    <Form.Control.Feedback type="invalid" />
                  </Form.Group>
                  {/* <Form.Group as={Col} md="2" controlId="validationCustom01">
                <Form.Label>Third Category</Form.Label>
                <Autocomplete
                  required
                  disablePortal
                  disableClearable
                  className="form-control ZipcodeSelector"
                  size="small"
                  // options={zipcodeData.map((option) => option.zip)}
                  sx={{ width: 150 }}
                  renderInput={(params) => <TextField {...params} label="ZipCode" required />}
                  // value={[zipCode]}
                  // onChange={(event, value) => setZipCode(value)}
                  />
                  <Form.Control.Feedback type="invalid"/>
                    </Form.Group> */}
                  <div className='updatebtnCoverZip' md="6">
                    <Button type="submit" className='buttonstyled' style={{ maxHeight: '36px' }} onClick={createCatMapping}>Update</Button>
                    <Button type="submit" className='buttonstyled' style={{ maxHeight: '36px' }} id='clear-btn-mapping' onClick={clearcategoryMappingField}>Reset</Button>
                    {/* <Button type="submit" className='buttonstyled' style={{maxHeight: '36px'}}  onClick={handleOpenZip2}>View</Button> */}
                    <Button type='submit' className='buttonstyled' style={{ maxHeight: '36px' }} onClick={handleOpenUpZip2}>Upload
                      <input hidden accept="image/*" multiple type="file" />
                    </Button>
                    {/* <Modal
                  open={openZip2}
                  onClose={handleCloseZip2}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <ZipDataTable/>
                      </Modal> */}
                    <Modal
                      open={openUpZip2}
                      onClose={handleCloseUpZip2}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <div className='UploadBtnCover'>
                        <div className='ModalTitle'>
                          <div>please Upload the xlxs format file only</div>
                          <Button onClick={handleCloseUpZip2} className='buttonstyled CloseButton-X'>X</Button>
                        </div>
                        <div>
                          <Button variant="contained" component="label">
                            <input accept=".xlsx" multiple type="file" id='catMap_file' onChange={handleCatMapFile} />
                          </Button>
                          <Button className='buttonstyled' id='catMap_file_btn' onClick={uploadCatMap_file} >Upload</Button>
                          {catMap_error && <div style={{ color: 'red' }}>
                            Please Upload proper file
                            <ul>
                              <li>
                                Check if any secondary category kept empty
                              </li>
                              <li>
                                Non existing category added
                              </li>
                            </ul>
                          </div>}
                          {catMap_success && <div style={{ color: 'green' }}>File is uploaded</div>}
                        </div>
                        <div className='sampleFile'>Sample file :<a href={Cat_mapping_file} download="Category_Mapping_Sample.xlsx"> Download Here </a> </div>
                      </div>
                    </Modal>

                  </div>
                  <div style={{ color: error_2 ? 'red' : 'green' }}>
                    {feedbackMessageerror_2}
                  </div>
                  <div><div>Note:</div>
                    <ul>
                      <li>While adding the Top Category please do keep primary category empty</li>
                      <li>You cannot keep both category same</li>
                      <li>While uploading xlxs file please do folloow the sample format (sample format available for download in upload section)</li>
                    </ul>
                  </div>
                </Row>
              </Form>
            </div>

          </AccordionDetails>
        </Accordion>
        {/*Create Product*/}
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>Create Product</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className='UpdateDataForm-create-category'>
              <Form noValidate validated={validated_3} >
                <Row className="mb-3 ">
                  <Form.Group as={Col} md="3" controlId="validationCustom01">
                    <Form.Label>Base Category</Form.Label>
                    <Autocomplete
                      required
                      disablePortal
                      disableClearable
                      className="form-control ZipcodeSelector"
                      size="small"
                      error={error_3}
                      options={baseCategoryList.map((option) => option.category)}
                      sx={{ width: 150 }}
                      renderInput={(params) => <TextField {...params} error={error_3} label="Base Category" required />}
                      value={[base_Cat]}
                      onChange={(event, value) => setBase_Cat(value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {/* {errorMessage_3} */}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="validationCustom02">
                    <Form.Label>Product</Form.Label>
                    <Form.Control
                      type="text"
                      id='ProductCP'
                      placeholder="Product"
                      value={product_Cat}
                      required
                      onChange={(event) => setProduct_Cat(event.target.value)}
                      isInvalid={error_3}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorMessage_3}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3 ProRow">
                  <Form.Group as={Col} md="2" controlId="validationCustom05">
                    <Form.Label>Installation</Form.Label>
                    <Form.Control
                      type="number"
                      id='InstallationCP'
                      placeholder="Installation"
                      value={install}
                      required
                      onChange={(event) => setInstall(event.target.value)}
                      isInvalid={error_3}
                    />
                    <Form.Control.Feedback type="invalid">

                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="2" controlId="validationCustom05">
                    <Form.Label>Uninstallation</Form.Label>
                    <Form.Control
                      type="number"
                      id='uninstallationCP'
                      placeholder="Uninstallation"
                      value={uninstall}
                      required
                      onChange={(event) => setUninstall(event.target.value)}
                      isInvalid={error_3}
                    />
                    <Form.Control.Feedback type="invalid">

                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="2" controlId="validationCustom05">
                    <Form.Label>Hauloff</Form.Label>
                    <Form.Control
                      type="number"
                      id='hauloffCP'
                      placeholder="Hauloff"
                      value={hauloff}
                      required
                      onChange={(event) => setHaulOff(event.target.value)}
                      isInvalid={error_3}
                    />
                    <Form.Control.Feedback type="invalid">

                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className='updatebtnCoverZip' md="6">
                    <Button type="submit" className='buttonstyled' style={{ maxHeight: '36px' }} onClick={createProduct}>Add</Button>
                    <Button type="submit" className='buttonstyled' style={{ maxHeight: '36px' }} id='clear-btn-CP' onClick={clearCreateProduct}>Reset</Button>
                    <Button type='submit' className='buttonstyled' style={{ maxHeight: '36px' }} onClick={handleOpenUpZip3}>Upload
                      <input hidden accept="image/*" multiple type="file" />
                    </Button>
                  </div>
                  <Modal
                    open={openUpZip3}
                    onClose={handleCloseUpZip3}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <div className='UploadBtnCover'>
                      <div className='ModalTitle'>
                        <div>please Upload the xlxs format file only</div>
                        <Button onClick={handleCloseUpZip3} className='buttonstyled CloseButton-X'>X</Button>
                      </div>
                      <div>
                        <Button variant="contained" component="label">
                          <input accept=".xlsx" multiple type="file" id='zipcode_file' onChange={handleProductFile} />
                        </Button>
                        <Button className='buttonstyled' id='zipcode_file_btn' onClick={uploadProduct_file} >Upload</Button>
                        {uploadProduct_error && <div style={{ color: 'red' }}>Please Upload proper file
                          <ul>
                            <li>
                              Check if any product name or category kept empty
                            </li>
                            <li>
                              Non existing category added mapped to product
                            </li>
                          </ul></div>}
                        {uploadProduct_success && <div style={{ color: 'green' }}>File is uploaded</div>}
                      </div>
                      <div className='sampleFile'>Sample file :<a href={Product_file} download="Add_Product_sample.xlsx"> Download Here </a> </div>
                    </div>
                  </Modal>
                </Row>
              </Form>
            </div>
          </AccordionDetails>
        </Accordion>
        {/*Update Product*/}
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
            <Typography>Update Product</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className='UpdateDataForm-create-category'>
              <Form noValidate validated={validated_4} >
                <Row className="mb-3 ">
                  <Form.Group as={Col} md="3" controlId="validationCustom02">
                    <Form.Label>Product</Form.Label>
                    <Autocomplete
                      required
                      disablePortal
                      disableClearable
                      className="form-control ZipcodeSelector"
                      size="small"
                      error={error_4}
                      options={allProductList.map((option) => option.product)}
                      sx={{ width: 150 }}
                      renderInput={(params) => <TextField {...params} error={error_4} label="Product" required />}
                      value={[product_Cat_U]}
                      onChange={(event, value) => setProduct_Cat_U(value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Product Name.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="validationCustom01">
                    <Form.Label>Base Category</Form.Label>
                    <Autocomplete
                      required
                      disablePortal
                      disableClearable
                      className="form-control ZipcodeSelector"
                      size="small"
                      error={error_4}
                      options={baseCategoryList.map((option) => option.category)}
                      sx={{ width: 150 }}
                      renderInput={(params) => <TextField {...params} error={error_4} label="Base Category" required />}
                      value={[base_Cat_U]}
                      onChange={(event, value) => setBase_Cat_U(value)}
                    />
                    <Form.Control.Feedback type="invalid" />
                  </Form.Group>
                </Row>
                <Row className="mb-3 ProRow">
                  <Form.Group as={Col} md="2" controlId="validationCustom05">
                    <Form.Label>Installation</Form.Label>
                    <Form.Control
                      type="number"
                      id='InstallationUP'
                      placeholder="Installation"
                      value={install_U}
                      required
                      onChange={(event) => setInstall_U(event.target.value)}
                      isInvalid={error_4}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid charges.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="2" controlId="validationCustom05">
                    <Form.Label>Uninstallation</Form.Label>
                    <Form.Control
                      id='uninstallationUP'
                      type="number"
                      placeholder="Uninstallation"
                      value={uninstall_U}
                      required
                      onChange={(event) => setUninstall_U(event.target.value)}
                      isInvalid={error_4}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid charges.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="2" controlId="validationCustom05">
                    <Form.Label>Hauloff</Form.Label>
                    <Form.Control
                      id='hauloffUP'
                      type="number"
                      placeholder="Hauloff"
                      value={hauloff_U}
                      required
                      onChange={(event) => setHaulOff_U(event.target.value)}
                      isInvalid={error_4}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid charges.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className='updatebtnCoverZip' md="6">
                    <Button type="submit" className='buttonstyled' style={{ maxHeight: '36px' }} onClick={updateProduct}>Update</Button>
                    <Button type="submit" className='buttonstyled' style={{ maxHeight: '36px' }} id='clear-btn-UP' onClick={clearUpdateProduct}>Reset</Button>
                  </div>
                </Row>
              </Form>
            </div>
          </AccordionDetails>
        </Accordion>
        {/* create parts*/}
        <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
          <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
            <Typography>Create Parts</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className='UpdateDataForm-create-category'>
              <AddParts />
            </div>
          </AccordionDetails>
        </Accordion>
        {/*Mapping parts*/}
        <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
          <AccordionSummary aria-controls="panel9d-content" id="panel9d-header">
            <Typography>Map Parts</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className='UpdateDataForm-create-category'>
              <MapPartToProduct />
            </div>
          </AccordionDetails>
        </Accordion>
        {/*Create Zipcode*/}
        <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
          <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
            <Typography>Add ZipCode</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className='UpdateDataForm-create-category'>
              <Form noValidate validated={validated_5} >
                <Row className="mb-3">
                  <Form.Group as={Col} md="2" controlId="validationCustom01">
                    <Form.Label>ZipCode</Form.Label>
                    <Form.Control
                      type="number"
                      id='Create_Zipcode'
                      placeholder="ZipCode"
                      value={zipcodeC}
                      required
                      onChange={(event) => setZipcodeC(event.target.value)}
                      isInvalid={error_5}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorMessage_5}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="2" controlId="validationCustom01">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="City"
                      id='Create_city'
                      value={cityC}
                      required
                      onChange={(event) => setCityC(event.target.value)}
                      isInvalid={error_5}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorMessage_5}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="2" controlId="validationCustom01">
                    <Form.Label>Miles</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Miles"
                      id='Create_miles'
                      value={milesC}
                      required
                      onChange={(event) => setMilesC(event.target.value)}
                      isInvalid={error_5}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorMessage_5}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* <Form.Group as={Col} md="2" controlId="validationCustom01">
                <Form.Label>vehicleCharge</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="vehicleCharge"
                        value={vehicleChargeC}
                        disabled
                  onChange={(event) => setVehicleChargeC(event.target.value)}
                  isInvalid={error_5}
                  />
                <Form.Control.Feedback type="invalid">
            Please provide a valid vehicleCharge
          </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="2" controlId="validationCustom01">
                <Form.Label>labor Charge</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="laborCharge"
                    value={laborChargeC}
                    disabled
                    onChange={(event) => setLaborChargeC(event.target.value)}
                    isInvalid={error_5}
                  />
                <Form.Control.Feedback type="invalid">
            Please provide a valid laborCharge
          </Form.Control.Feedback>
                </Form.Group> */}
                  <div className='updatebtnCoverZip' md="3">
                    <Button type="submit" className='buttonstyled' style={{ maxHeight: '36px' }} onClick={createZipcode}>Update</Button>
                    <Button type="submit" className='buttonstyled' id='clear-btn-CreateZip' style={{ maxHeight: '36px' }} onClick={resetCreateZipCode}>Reset</Button>
                    <Button type='submit' className='buttonstyled' style={{ maxHeight: '36px' }} onClick={handleOpenUpZip5}>Upload
                      <input hidden accept="image/*" multiple type="file" />
                    </Button>
                    {/* <Modal
                  open={openZip5}
                  onClose={handleCloseZip5}setCity
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <ZipDataTable/>
                </Modal> */}
                    <Modal
                      open={openUpZip5}
                      onClose={handleCloseUpZip5}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <div className='UploadBtnCover'>
                        <div className='ModalTitle'>
                          <div>please Upload the xlxs format file only</div>
                          <Button onClick={handleCloseUpZip5} className='buttonstyled CloseButton-X'>X</Button>
                        </div>
                        <div>
                          <Button variant="contained" component="label">
                            <input accept=".xlsx" name='file' type="file" id='zipcode_file' onChange={handleZipCodeFile} />
                          </Button>
                          <Button className='buttonstyled' id='zipcode_file_btn' onClick={uploadZipcode_file} >Upload</Button>

                          {uploadZip_error && <div style={{ color: 'red' }}>Please Upload proper file
                            <ul>
                              <li>
                                Check if any Zipcode kept empty
                              </li>
                            </ul></div>}
                          {uploadZip_success && <div style={{ color: 'green' }}>File is uploaded</div>}
                        </div>
                        <div className='sampleFile'>Sample file :<a href={Zipcode_file} download="Zipcode_Sample.xlsx"> Download Here </a> </div>
                      </div>
                    </Modal>
                  </div>
                </Row>
              </Form>
            </div>
          </AccordionDetails>
        </Accordion>
        {/*Update Zipcode*/}
        <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
          <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
            <Typography>Update ZipCode</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className='UpdateDataForm-create-category'>
              <Form noValidate validated={validated_6} >
                <Row className="mb-3">
                  <Form.Group as={Col} md="2" controlId="validationCustom01">
                    <Form.Label>ZipCode</Form.Label>
                    <Autocomplete
                      id='Update_Zipcode'
                      required
                      disablePortal
                      className="form-control ZipcodeSelector"
                      size="small"
                      freeSolo
                      options={zipcodeList.map((option) => option.zip)}
                      sx={{ width: 150 }}
                      renderInput={(params) => <TextField {...params} id='Update_Zipcode' error={error_6} label="Zipcode" required />}
                      value={[zipcodeU]}
                      onChange={(event, value) => setZipcodeU(value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Zipcode
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="2" controlId="validationCustom01">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      id='Update_city'
                      type="text"
                      placeholder="City"
                      value={cityU}
                      required
                      onChange={(event) => setCityU(event.target.value)}
                      isInvalid={error_6}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid city
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="2" controlId="validationCustom01">
                    <Form.Label>Miles</Form.Label>
                    <Form.Control
                      id='Update_miles'
                      type="number"
                      placeholder="miles"
                      value={milesU}
                      required
                      onChange={(event) => setMilesU(event.target.value)}
                      isInvalid={error_6}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid miles
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="2" controlId="validationCustom01">
                    <Form.Label>vehicle Charge</Form.Label>
                    <Form.Control
                      type="number"
                      id='Update_vehicleCharge'
                      placeholder="vehicleCharge"
                      value={vehicleChargeU}
                      disabled
                      onChange={(event) => setVehicleChargeU(event.target.value)}
                      isInvalid={error_6}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid vehicleCharge
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="2" controlId="validationCustom01">
                    <Form.Label>Labor Charge</Form.Label>
                    <Form.Control
                      id='update_labor'
                      type="number"
                      placeholder="Labor Charge"
                      value={laborChargeU}
                      disabled
                      onChange={(event) => setLaborChargeU(event.target.value)}
                      isInvalid={error_6}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid labor Charge
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className='updatebtnCoverZip' md="3">
                    <Button type="submit" className='buttonstyled' style={{ maxHeight: '36px' }} onClick={updateZipcode}>Update</Button>
                    <Button type="submit" className='buttonstyled' id='clear-btn-UpdateZip' style={{ maxHeight: '36px' }} onClick={resetUpdateZipCode}>Reset</Button>
                    {/* <Button type="submit" className='buttonstyled' style={{maxHeight: '36px'}}  onClick={handleOpenZip6}>View</Button> */}
                    {/* <Button type='submit' className='buttonstyled' style={{maxHeight: '36px'}} onClick={handleOpenUpZip6}>Upload
                <input hidden accept="image/*" multiple type="file" />
                </Button> */}
                    {/* <Modal
                  open={openZip6}
                  onClose={handleCloseZip6}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <ZipDataTable/>
                </Modal> */}
                    {/* <Modal
                  open={openUpZip6}
                  onClose={handleCloseUpZip6}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <div className='UploadBtnCover'>
                    <div>please Upad the CVS format file only</div>
                  <Button variant="contained" component="label">
                    Upload
                    <input accept="image/*" multiple type="file" />
                    </Button>
                    </div>
                </Modal> */}
                  </div>
                </Row>
              </Form>
            </div>
          </AccordionDetails>
        </Accordion>
        {/*Update Utility - minDiliveryCharge*/}
        <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
          <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
            <Typography>Update Utility</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className='UpdateDataForm-create-category'>
              <Form noValidate validated={validated_7} >
                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>Min Purchase Price</Form.Label>
                    <Form.Control
                      type="number"
                      id='minDiliveryCharge'
                      placeholder="Min Purchase Price"
                      value={minDiliveryCharge}
                      required
                      onChange={(event) => setMinDiliveryCharge(event.target.value)}
                      isInvalid={error_7}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid charges.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className='updatebtnCoverZip' md="3">
                    <Button type="submit" className='buttonstyled' style={{ maxHeight: '36px' }} onClick={updateUtility}>Update</Button>
                    <Button type="submit" className='buttonstyled' style={{ maxHeight: '36px' }} id='clear-btn-Utility' onClick={resetUpdateUtility}>Reset</Button>
                  </div>
                </Row>
              </Form>
            </div>
            {/* <div className='UpdateDataForm-create-category'>
          <Form noValidate validated={validated_7} >
                <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Min Purchase Price</Form.Label>
                  <Form.Control
                      type="number"
                      id='minDiliveryCharge'
                      placeholder="Min Purchase Price"
                      value={minDiliveryCharge}
                      required
                      onChange={(event) => setMinDiliveryCharge(event.target.value)}
                      isInvalid={error_7}
                  />
              <Form.Control.Feedback type="invalid">
            Please provide a valid charges.
          </Form.Control.Feedback>
                  </Form.Group>
              <div className='updatebtnCoverZip' md="3">
                <Button type="submit" className='buttonstyled' style={{maxHeight: '36px'}} onClick={updateUtility}>Update</Button>                              
                <Button type="submit" className='buttonstyled' style={{maxHeight: '36px'}} id='clear-btn-Utility' onClick={resetUpdateUtility}>Reset</Button>
                </div>
                </Row>
                </Form>
                </div> */}
          </AccordionDetails>

        </Accordion>
      </div>
    </div>
  );
}

export default UpdateScreen;