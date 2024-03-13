import React, { useEffect, useState } from "react";
import axios from '../utils/axios';
import MainLayout from "../layout/Main";
import { Button, Card, Container, Table } from "react-bootstrap";
import moment from "moment";
import { Link } from "react-router-dom";

const Home = () => {
    const [crawlData,setCrawlData] = useState([]);
    useEffect(()=>{
        fetchCrawlData();
    },[])
    const fetchCrawlData = async () => {
        let data;
        try{
            data = await axios.get('/crawler/get-page-data');
        }catch(e){
            data=false;
        }
        if(data && data.status === 200){
            setCrawlData(data.data.data.response);    
        }else{
            alert("Opps Something went wrong");
        }
    }
    const handleDeleteLink = async (id) => {
        ///delete-page-data/:page_id
        if(window.confirm("Are you sure? You want to delete this data.")){
            try{
                await axios.delete(`/crawler/delete-page-data/${id}`);
                alert("Link Deleted Successfully");
                fetchCrawlData();
            }catch(e){
                alert("Opps Something went wrong");
            }
        }
    }
    return (
        <React.Fragment>
            <MainLayout fetchCrawlData={fetchCrawlData} crawlPageShow={true} />
            <Container className=" mt-4 align-content-center">
                <Card>
                    <Card.Header>
                        <h5>Crawled Pages</h5>
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Url</th>
                                    <th>Is Robot Avaliable</th>
                                    <th>Created At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {crawlData && crawlData.length===0 && 
                                    <tr>
                                        <td colSpan={5} align="center">No Data Found</td>
                                    </tr>
                                }
                                {crawlData && crawlData.length>0 && crawlData.map((data,index)=>{
                                    return (
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{data.url}</td>
                                            <td>{data.is_robots}</td>
                                            <td>{moment(data.createdAt).format('DD-MM-YYYY')}</td>
                                            <td><Link to={`/child-crawl-page/${data._id}`}>View More</Link> | <Button variant="link" onClick={()=>handleDeleteLink(data._id)} >Delete</Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </React.Fragment>
    )
}

export default Home;