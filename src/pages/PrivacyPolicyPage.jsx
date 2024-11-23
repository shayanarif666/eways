import React from "react";
import { Layout } from "../components";

function PrivacyPolicyPage() {



    const cookieData = [
        { name: "FORM_KEY", description: "Stores randomly generated keys used to prevent forged requests." },
        { name: "PHPSESSID", description: "Your session ID on the server." },
        { name: "GUEST_VIEW", description: "Allows guests to view and edit their orders." },
        { name: "PERSISTENT_SHOPPING_CART", description: "A link to information about your cart and viewing history." },
        { name: "USER_ALLOWED_SAVE_COOKIE", description: "Indicates whether a user allows cookies." },
        // Add other cookies here...
    ];

    return (
        <Layout>

            <div className="px-12 py-16 mx-auto rounded-md">
                <h4 className="mb-4 text-lg font-bold">
                    Privacy and Cookie Policy
                </h4>

                <p className="text-gray-600 text-sm">
                    This privacy policy sets out how this website (hereafter "the Store") uses and protects any information that you give the Store while using this website. The Store is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement. The Store may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.
                </p>

                <h5 className="mt-6 text-gray-600 text-xl">
                    What we collect
                </h5>
                <p className="text-gray-600 text-sm">
                    We may collect the following information:
                </p>
                <ul className="list-disc list-inside mb-4 text-sm mt-4 text-gray-600">
                    <li>Contact information including mobile number and email address</li>
                    <li>Demographic information such as preferences and interests</li>
                    <li>Browsing and search history</li>
                    <li>Order history</li>
                    <li>Website data and app usage logs</li>
                    <li>Other information relevant to customer surveys and offers</li>
                </ul>

                <h5 className="mt-6 text-gray-600 text-xl">
                    What we do with the information we gather
                </h5>
                <p className="text-gray-600 text-sm">
                    We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:
                </p>
                <ul className="list-disc list-inside mb-4 text-sm mt-4 text-gray-600">
                    <li>Internal record keeping.</li>
                    <li>Demographic information such as preferences and interests</li>
                    <li>Browsing and search history</li>
                    <li>Order history</li>
                    <li>Website data and app usage logs</li>
                    <li>Other information relevant to customer surveys and offers</li>
                </ul>

                <h5 className="mt-6 text-gray-600 text-xl">
                    What we do with the information we gather
                </h5>
                <p className="text-gray-600 text-sm">
                    We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:
                </p>

                <h5 className="mt-6 text-gray-600 text-xl">
                    What we do with the information we gather
                </h5>
                <p className="text-gray-600 text-sm mt-4">
                    A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyse web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.
                </p>
                <p className="text-gray-600 text-sm mt-3">
                    We use traffic log cookies to identify which pages are being used. This helps us analyse data about web page traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.
                </p>
                <p className="text-gray-600 text-sm mt-3">
                    Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us. You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.
                </p>

            </div>

        </Layout>
    )
}

export default PrivacyPolicyPage
