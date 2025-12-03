import { Outlet, useNavigate } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { useEffect } from "react"
import { getAuthentication } from "../services/loginServices"

export const PrivateLayout = () => {

    const navigate = useNavigate()

    const authenticationPrivateZone = async () => {
        const response = await getAuthentication()
        if (!response){
            navigate('/')
        }
        console.log(response)
    }

    useEffect(()=>{
        authenticationPrivateZone()
    })

    return (
        <ScrollToTop>
            <Navbar />
                <Outlet />
            <Footer />
        </ScrollToTop>
    )
}