import React, { useEffect, useState } from "react"
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";


export const Home = () => {


	const { store, dispatch } = useGlobalReducer()

	return (
		<div className="text-center mt-5">
			<p className="lead">
			</p>
			<div className="alert alert-info">
				{store.message ? (
					<span>{store.message}</span>
				) : (
					<span className="text-danger">
						
					</span>
				)}
			</div>
		</div>
	);
}; 