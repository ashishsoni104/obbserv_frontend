import React, { useEffect, useState } from "react";
import MainLayout from "../layout/Main";
import { Button, Card, Container, Modal, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from '../utils/axios';
import moment from "moment";

const ChildCrawlPage = () => {
    const { crawl_id } = useParams();
    const [childPageData,setChildPageData] = useState([]);
    const [showModelData,setModelData] = useState([]);
    const [showModel,setShowModel] = useState(false);
    const [modelTitle,setModelTile] = useState("")
    useEffect(()=>{
        fetchChildPageData();
    },[crawl_id]);
    const fetchChildPageData = async () => {
        let data;
        try{
            data = await axios.get(`crawler/get-page-child-data?page_id=${crawl_id}`);
        }catch(e){
            data=false;
        }
        if(data && data.status === 200){
            setChildPageData(data.data.data.response);    
        }else{
            alert("Opps Something went wrong");
        }
    }
    const showData = (data,title) => {
        console.log(data);
        setModelTile(title);
        setModelData(data);
        setShowModel(true);
    }
    return (
        <React.Fragment>
            <MainLayout crawlPageShow={false} />
            <Container className=" mt-4 align-content-center">
                <Card>
                    <Card.Header>
                        <h5>Crawled Child Page</h5>
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>URL</th>
                                    <th>Title</th>
                                    <th>Heading H1</th>
                                    <th>Heading H2</th>
                                    <th>Page Links</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {childPageData && childPageData.length===0 &&
                                    <tr>
                                        <td align="center">No Data Found</td>
                                    </tr>
                                }
                                {childPageData && childPageData.length>0 && childPageData.map((data,index)=>{
                                    return (
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{data.url}</td>
                                            <td>{data.title}</td>
                                            {data.heading_h1?.length>0 ?
                                            <td><Button variant="link" onClick={()=>showData(data.heading_h1,'H1 Heading Data')}>{data.heading_h1?.length} Heading</Button></td>
                                            :<td>{data.heading_h1?.length} Heading</td>}
                                            {data.heading_h2?.length > 0 ?
                                            <td><Button variant="link" onClick={()=>showData(data.heading_h2,'H2 Heading Data')}>{data.heading_h2?.length} Heading</Button></td>
                                            :<td>{data.heading_h2?.length} Heading</td>}
                                            {data.page_links?.length > 0 ?
                                            <td><Button variant="link" onClick={()=>showData(data.page_links,'Link Data')}>{data.page_links?.length} Links</Button></td>
                                            : <td>{data.page_links?.length} Links</td>}
                                            <td>{moment(data.createdAt).format('DD-MM-YYYY')}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
            <Modal show={showModel} onHide={()=>setShowModel(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modelTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover className="mt-2 mb-2">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        {showModelData && showModelData.length>0 && showModelData.map((data,index)=>{
                            return (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{data}</td>
                                </tr>
                            )
                        })}
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setShowModel(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default ChildCrawlPage;