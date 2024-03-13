import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/Main";
import Home from "./pages/Home";
import ChildCrawlPage from "./pages/ChildCrawlPage";


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index  path="/" element={<Home />} />
				<Route path="/child-crawl-page/:crawl_id" element={<ChildCrawlPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
