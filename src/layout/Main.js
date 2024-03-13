import React from "react";
import HeaderLayout from "./Header";
import CrawlerUrl from "../component/CrawlerUrl";

const MainLayout = (props) => {
    const {fetchCrawlData,crawlPageShow} = props;
    return (
        <React.Fragment>
            <HeaderLayout />
            {crawlPageShow ?
                <div className="d-flex justify-content-center align-content-center">
                    <CrawlerUrl fetchCrawlData={fetchCrawlData} />
                </div>
            :null}
        </React.Fragment>
    )
}

export default MainLayout;