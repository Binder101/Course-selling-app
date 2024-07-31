import { Typography } from "@mui/material";
import React from "react";
import {useParams} from "react-router-dom";

export default function AdminDashboard() {
    const params = useParams();
    const id = params.id;
    return(
        <>
        Admin Dashboard : {id}
        <div style = {{paddingLeft : 20, paddingTop : 20}}>
            <Typography variant="h5">MY COURSES</Typography>
        </div>
        </>
    )
}
