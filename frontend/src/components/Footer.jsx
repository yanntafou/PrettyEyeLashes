import { assets } from "../assets/assets"


const Footer = () => {
    return (
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_3fr_1fr] gap-14 my-10 mt-40 text-sm">

                <div>
                    <img src={assets.logo} className='mb-5 w-32' alt="" />
                    <p className="w-full md:w-2/3 text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis placeat aut, porro consequatur sapiente enim .
                    </p>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>+1-514-996-5015</li>
                        <li>contact@myprettylashes.com</li>
                        <li>7467A Rue millet, Saint-Leonard</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr />
                <p className="py-5 text-sm text-center">Copyright 2024 My pretty lashes - All Rights Reserved</p>
            </div>
        </div>
    )
}

export default Footer
