import React, {useEffect, useState} from "react"
import Navbar from "./Navbar"
import MusicPlayer from "./MusicPlayer"

import {Grid} from "@material-ui/core"

export default function LandingPage () {
    
    return (
        <>  
        <Grid container>
            <Grid item sx={12}>
                <Navbar/>
            </Grid>
            <Grid item>
                <p>This is Landing page</p>
            </Grid>
            <Grid item sx={12}>
                <MusicPlayer/>
            </Grid>
        </Grid>
            
        </>
    )
}