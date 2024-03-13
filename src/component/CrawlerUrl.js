import React, { useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import axios from '../utils/axios';

const CrawlerUrl = (props) => {
    const {fetchChildPageData,fetchCrawlData} = props;
    const [url,setUrl] = useState("");
    const [loading,setLoading] = useState(false);
    const stringIsAValidUrl = (urlData) => {
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test(urlData);
    }
    const fetchCrawlUrlData = async () => {
        if(url !=="" && stringIsAValidUrl(url)){
            setLoading(true);
            try{
                let response = await axios.post('crawler/run-crawler',{url:url});
                if(response.status === 205){
                    alert("You already done crawl for this.");
                }
                if(response.status === 200){
                    if(fetchCrawlData){
                        fetchCrawlData();
                    }
                    alert("Crawl Successfully Fetched Data");
                }
            }catch(e){
                console.log(e);
                setLoading(false);
                setUrl("");
                alert("Oops Something went wrong");
            }
            setUrl("");
            setLoading(false);
        }else{
            alert("Please enter valid url");
        }
    }

    return (
        <Card className="mt-4 w-75 d-flex justify-content-center"> 
            <Card.Header>
                <h5>Paste Url Get Data (Please paste base url-https://example.com)</h5>
            </Card.Header>
            <Card.Body className="">
                <Form className="form-inline">
                    <Form.Group className="mt-2 mb-4">
                        <Form.Control 
                            type="text"
                            placeholder="Enter URL"
                            size="lg"
                            value={url}
                            onChange={(e)=>setUrl(e.target.value)}
                        />
                    </Form.Group>
                    <div className="text-center">
                        <Button 
                            variant="primary" 
                            onClick={()=>fetchCrawlUrlData()}
                            disabled={loading}
                        >
                            Fetch Data {loading? <Spinner animation="border" size="sm" />:null}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default CrawlerUrl;