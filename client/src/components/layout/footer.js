import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (

        <div className='foot'>
            <div class="container-fluid pb-0 mb-0 justify-content-center text-light">
                <footer>
                    <div class="row my-1 justify-content-center py-5">
                        <div class="col-11">
                            <div class="row ">
                                <div class="col-xl-6 col-md-4 col-sm-4 col-12   my-auto mx-auto a"><div className='row'><div><h3 class="text-muted mb-md-0 mb-3 bold-text">Pepper.</h3></div><div>wCasmart is a fashion theme for presents a complete wardrobe of uniquely crafted Ethnic Wear, Casuals, Edgy Denims, & Accessories inspired from the most contemporary</div></div></div>
                                <div class="col-xl-2 col-md-4 col-sm-4 col-12"><h6 class="mb-1 mb-lg-4 bold-text "><b>MENU</b></h6><ul class="list-unstyled"><li>Home</li><li>About</li><li>Blog</li><li>Portfolio</li></ul></div>
                                <div class="col-xl-2 col-md-4 col-sm-4 col-12"><h6 class="mb-1 mb-lg-4 text-muted bold-text mt-sm-0 mt-5"><b>ADDRESS</b></h6><p class="mb-1">605, RATAN ICON BUILDING</p><p>SEAWOODS SECTOR</p> </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>


    )
}

export default Footer