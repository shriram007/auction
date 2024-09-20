import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './NavBar';




const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [BidModal, setBidModal] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([])
    const [filteredData, setFilteredData] = useState()
    const [productName, setproductName] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedId, setSelectedId] = useState({})
    const [selectedData, setselectedData] = useState([])
    const [show, setShow] = useState(false);
    const [showbid, setShowbid] = useState(false);
    const [showId, setshowId] = useState({});
    const [bidAmount, setbidAmount] = useState({});
    const [emails, setemails] = useState({});
    const [bidupdate, setbidupdate] = useState([]);

    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm();


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
                // console.log(products);


                const uniqueCategory = [...new Set(response.data.map(product => product.category))]
                setCategory(uniqueCategory)
                // console.log(category);
            }
            catch (err) {
                console.error(err)
            }
        }
        fetchProducts();
    }, [])

    useEffect(() => {
        if (selectedCategory) {
            const filtered = products.filter(product => product.category === selectedCategory);
            setFilteredProducts(filtered);
            // console.log(filteredProducts);

        }
        else {
            setFilteredProducts([]);
        }


    }, [selectedCategory, products])


    const handleClose = () => {
        setShow(false)
        setShowbid(false)
    }
    const handleCreateBid = (productId) => {
        setSelectedId(productId._id)
        setproductName(productId.productName)
        // console.log(selectedId);
        setShow(true);
    }

    const handleshowBid = async (selectedId) => {
        try {
            const response = await axios.get('http://localhost:5000/api/submitbid');
            setselectedData(response.data);

            if (selectedId) {
                const filteredDat = selectedData.filter(pro => pro.selectedId === selectedId)
                setFilteredData(filteredDat);
                console.log(filteredData)
            }


        }
        catch (error) {

        }
    }
    //select option for category handle function
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    }
    const hidebid = () => setBidModal(false);
    const handleIdBid = (idd) => {
        console.log(idd);
        setShowbid(true)
        setshowId(idd._id);
        setbidAmount(idd.bidamount)
        setemails(idd.email)


    }
    const handleBidChange = (event) => {
        setbidAmount(event.target.value)

    }

    const handleEmailChange = (event) => {
        setemails(event.target.value)
    }

    const handleBidUpdate = async () => {
        setbidupdate([showId, bidAmount]);
        console.log(bidupdate);
        try {
            const response = await axios.put(`http://localhost:5000/api/updatebid/${showId}`, { bidamount: bidAmount });
            console.log(response.data.message);
        }
        catch (err) {
            console.error(err)
 
        }
    }

    const handleProductIdChange = (event) => {
        setSelectedId(event.target.value)
        setshowId(event.target.value)
    }
    const onSubmit = async data => {
        const formdatawithId = { ...data, selectedId, productName }
        console.log(formdatawithId);
        // setformData(formdata1);
        try {
            // console.log(data);

            const res = await axios.post('http://localhost:5000/api/submitbid', formdatawithId);
            console.log('Response', res);
            reset()
            toast.success('Bid submitted Successfully');

            setBidModal(true);
            setShow(false)


        }
        catch (err) {
            if (err.response && err.response.status === 400) {
                toast.error('exists already');
            }
            toast.error(err.response.data)
        }


    }


    return (
        <div>
            <NavBar />
            <div className='container mt-9 '>

                <ToastContainer />
                <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value=''> select catergory</option>
                    {category.map((item, index) => <option key={index} value={item}>{item}</option>)}
                </Form.Select>
                <div className='flex gap-3 mt-5'>

                    {
                        filteredProducts.map((proo) => (
                            <>
                                <Card  >

                                    <Card.Body>
                                        <Card.Text>

                                            <div> Product Name : {proo.productName}</div>
                                            <div>Description : {proo.description}</div>
                                            <div>Bid End Date : {proo.bidenddate}</div>
                                            <div>Product Id : {proo._id}</div>

                                            <Modal size="xm" show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Create New Bid</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>

                                                    <Form>
                                                        <Form.Group>
                                                            <Form.Label>Product Id:</Form.Label>

                                                            <Form.Control type="text" id="productId" value={selectedId} onChange={handleProductIdChange} />




                                                        </Form.Group><Row>
                                                            <input value={productName} onChange={(e) => setproductName(e.target.value)} />
                                                            <Form.Group as={Col} md='4'>

                                                                <Form.Label htmlFor="firstName">First Name:</Form.Label>

                                                                <Form.Control type="text" id="firstName" {...register('firstName', { required: true })} />
                                                                {errors.firstName && <p>This field is required</p>}

                                                            </Form.Group>
                                                            <Form.Group as={Col} md='4'>


                                                                <Form.Label htmlFor="lastName" >Last Name:</Form.Label>

                                                                <Form.Control type="text" id="lastName" {...register('lastName', { required: true })} />
                                                                {errors.lastName && <p>This field is required</p>}

                                                            </Form.Group>
                                                            <Form.Group as={Col} md='4'>

                                                                <Form.Label htmlFor="address">Address:</Form.Label>
                                                                <Form.Control type="text" id="address" {...register('address', { required: true })} />
                                                                {errors.address && <p>This field is required</p>}

                                                            </Form.Group>  </Row><Row>
                                                            <Form.Group as={Col} md='4'>

                                                                <Form.Label htmlFor="city">City:</Form.Label>
                                                                <Form.Control type="text" id="city" {...register('city', { required: true })} />
                                                                {errors.city && <p>This field is required</p>}

                                                            </Form.Group>


                                                            <Form.Group as={Col} md='4'>

                                                                <Form.Label htmlFor="state">State:</Form.Label>

                                                                <Form.Control type="text" id="state" {...register('state', { required: true })} />
                                                                {errors.state && <p>This field is required</p>}

                                                            </Form.Group>
                                                            <Form.Group as={Col} md='4'>

                                                                <Form.Label htmlFor="pincode">Pincode:</Form.Label>

                                                                <Form.Control type="number" id="pincode" {...register('pincode', { required: true })} />
                                                                {errors.pincode && <p>This field is required</p>}

                                                            </Form.Group>
                                                        </Row>
                                                        <Row>
                                                            <Form.Group as={Col} md='4'>

                                                                <Form.Label htmlFor="phoneNumber">Phone Number:</Form.Label>

                                                                <Form.Control type="number" id="phoneNumber" {...register('phoneNumber', { required: true, maxLength: 10, minLength: 10 })} />
                                                                {errors.phoneNumber && errors.phoneNumber.type === "required" && (<p>This field is required</p>)}
                                                                {errors.phoneNumber && errors.phoneNumber.type === "maxLength" && (
                                                                    <p role="alert">Invalid Number</p>
                                                                )}
                                                                {errors.phoneNumber && errors.phoneNumber.type === "minLength" && (
                                                                    <p role="alert">Invalid Number</p>
                                                                )}
                                                            </Form.Group>
                                                            <Form.Group as={Col} md='3'>
                                                                <Form.Label htmlFor="email">Bid Amount:</Form.Label>
                                                                <Form.Control type="number" id="bidamount" {...register('bidamount', { required: true })} />
                                                                {errors.bidamount && <p>This field is required</p>}

                                                            </Form.Group>
                                                            <Form.Group as={Col} md='5'>
                                                                <Form.Label htmlFor="email">Email:</Form.Label>
                                                                <Form.Control type="email" id="email" {...register('email', { required: true })} />
                                                                {errors.email && <p>This field is required</p>}

                                                            </Form.Group>
                                                        </Row>
                                                    </Form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose}>
                                                        Close
                                                    </Button>
                                                    <></>
                                                    {/* disabled={!isValid} */}
                                                    <Button variant="primary" disabled={!isValid} onClick={handleSubmit(onSubmit)}>
                                                        Save Changes
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                            <Modal show={BidModal} onHide={hidebid}>
                                                <Modal.Header closeButton>

                                                </Modal.Header>
                                                <Modal.Body>New Bid Created Successfully!</Modal.Body>
                                                <Modal.Footer>

                                                    <Button variant="primary" onClick={hidebid}>
                                                        Add More Bid
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>


                                        </Card.Text>
                                        <Button type="button" className='Primary mr-5 mb-1' onClick={() => handleshowBid(proo._id)}>Show Available Bids</Button>

                                        <span></span>

                                        <Button type="button" className="Primary " onClick={() => handleCreateBid(proo)}>Create New Bid</Button>

                                    </Card.Body>
                                </Card>



                            </>

                        ))

                    }





                </div >
                <div>
                    {filteredData ? <>
                        <h1>Table</h1>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>
                                        First Name
                                    </th>
                                    <th>
                                        Last Name
                                    </th>
                                    <th>
                                        Phone Number
                                    </th>
                                    <th>
                                        Bid Amount
                                    </th>
                                    <th>
                                        Email
                                    </th>
                                    <th>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    filteredData.length === 0 ? <>No Bid data</> : <> {filteredData.map((fdata) => (
                                        <tr>
                                            <td>{fdata.firstName}</td>
                                            <td>{fdata.lastName}</td>
                                            <td>{fdata.phoneNumber}</td>

                                            <td>{fdata.bidamount}</td>
                                            <td>{fdata.email}</td>
                                            <td><Button onClick={() => handleIdBid(fdata)}>Update ✎</Button></td>
                                            <Modal show={showbid} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Create New Bid</Modal.Title>
                                                </Modal.Header>
                                                <Form>
                                                    <Form.Group>
                                                        <Form.Label>Product Id:</Form.Label>
                                                        <Form.Control type="text" id="productId" value={showId} onChange={handleProductIdChange} readOnly />
                                                    </Form.Group>

                                                    <Form.Group>
                                                        <Form.Label>Bid Amount:</Form.Label>
                                                        <Form.Control id="bidamount" value={bidAmount} onChange={handleBidChange} />
                                                    </Form.Group>

                                                    <Form.Group>
                                                        <Form.Label>Email:</Form.Label>
                                                        <Form.Control type="email" id="email" value={emails} onChange={handleEmailChange} readOnly />
                                                    </Form.Group>


                                                </Form>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose}>
                                                        Close
                                                    </Button>
                                                    <></>
                                                    {/* disabled={!isValid} */}
                                                    <Button variant="primary" onClick={handleBidUpdate}>
                                                        Save Changes
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>

                                        </tr>

                                    ))
                                    } </>
                                }

                            </tbody>

                        </Table>
                    </> : <></>}

                </div>

            </div>
        </div>
    )
}

export default ProductsList