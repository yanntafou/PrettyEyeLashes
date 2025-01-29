import { assets } from "../assets/assets"
import NewsLetter from "../components/NewsLetter"
import Title from "../components/Title"


const About = () => {
    return (
        <div>
            <div className="text-2xl text-center pt-8 border-t">
                <Title text1={'ABOUT'} text2={'US'} />
            </div>

            <div className="my-10 flex flex-col md:flex-row gap-16">
                <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="" />
                <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eveniet dolore possimus! Perspiciatis voluptatibus amet minima odit, exercitationem vitae natus mollitia harum laboriosam, numquam obcaecati accusamus cumque nisi unde sit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi perspiciatis, voluptatem voluptate possimus adipisci nostrum sapiente ipsam voluptatibus aut minus consequuntur facere odio molestiae tenetur labore officiis sunt aliquam. Cum!</p>
                    <b className="text-gray-800">Our Mission</b>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit aut, velit repudiandae ullam animi, culpa adipisci aliquam id impedit distinctio eum placeat delectus. Magni, repellendus corrupti quisquam laboriosam iusto sunt.</p>
                </div>
            </div>

            {/* ----- Why us section-------- */}

            <div className="text-2xl py-4">
                <Title text1={'WHY'} text2={'CHOOSE US'} />
            </div>

            <div className="flex flex-col md:flex-row text-sm mb-20">

                <div className="border px-10 md:^x-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Quality Assurance:</b>
                    <p className="text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus aspernatur ratione quidem. Adipisci nisi repellat fugit nam! Distinctio a quas, maiores, officia est non id autem amet ducimus, accusantium cum?</p>
                </div>

                <div className="border px-10 md:^x-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Convenience:</b>
                    <p className="text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus aspernatur ratione quidem. Adipisci nisi repellat fugit nam! Distinctio a quas, maiores, officia est non id autem amet ducimus, accusantium cum?</p>
                </div>

                <div className="border px-10 md:^x-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Fast Delivery:</b>
                    <p className="text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus aspernatur ratione quidem. Adipisci nisi repellat fugit nam! Distinctio a quas, maiores, officia est non id autem amet ducimus, accusantium cum?</p>
                </div>

                <div className="border px-10 md:^x-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>24/7 Customer Support:</b>
                    <p className="text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus aspernatur ratione quidem. Adipisci nisi repellat fugit nam! Distinctio a quas, maiores, officia est non id autem amet ducimus, accusantium cum?</p>
                </div>
            </div>

            <NewsLetter />

        </div>
    )
}

export default About
