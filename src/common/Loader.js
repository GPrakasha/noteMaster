import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function CustomLoader () {
    return (
        <Loader 
            type="MutatingDots"
            color="#FFD662FF"
            secondaryColor="#85B3D1FF"
            height={100}
            width={100}
            visible={true}
        />
    );
}
