import React, { Component, useEffect, useState } from 'react';

require('./privacy-policy-component.scss');



export default function PrivacyPolicy(){

    return (
        <div className='privacy-policy'>
            <h2>Privacy Policy</h2>
            <p>Last updated: May 20, 2022</p>
            <p>We at Racoins.cc are committed to protecting your personal information, in fact,
                 one of our main priorities is the privacy of our visitors.</p>
            <p>This Privacy Policy contains <strong>What types of information we collect, How we use your information and How we manage the collected data.</strong></p>
            <p>Please read very carefully to fully understand what we do with the information we collect.</p>
            
            <h4>Consent</h4>
            <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

            <h4>What information do we collect?</h4>
            <p>Certain Data is/are collected automatically when using the Service.</p>
            <p>Certain Data may include information such as Internet protocol (IP) address, Browser characteristics and Device information.</p>
            <p>If you contact us directly, we may receive additional information about you such as your name, email address, 
                phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
            <h4>How we use your information</h4>
            <p>We use the information we collect in various ways, including:</p>
            <p>We may use your information in order to <strong>reach</strong> and <strong>communicate with you</strong>, either directly or through other communication platform.</p>
            <p>We may use your information <strong>to fulfill</strong> your orders, payments etc. made through the website.</p>
            <p>We may use your information <strong>to Operate</strong> and <strong>Maintain</strong> Our Website.</p>
            <p>We may use your information <strong>to provide you</strong> with updates and other information relating to the Website, and for marketing and promotional purposes.</p>

            <h4>Cookies and Web Beacons</h4>
            <p>Like any other website, Racoins.cc uses ‘cookies'. 
                These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited.
                 The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
            
            <h4>Third-Party Privacy Policy</h4>
            <p>Racoins.cc's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. 
                It may include their practices and instructions about how to opt-out of certain options. You may find a complete list of these Privacy Policies and their links here: Privacy Policy Links.
                You can choose to disable cookies through your individual browser options.
                To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites</p>
            
            <h4>Security of Your information</h4>
            <p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. 
                While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
            
            <h4>Minor's information</h4>
            <p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
                Racoins.cc does not knowingly collect any Personal Identifiable Information from children under the age of 13. 
                If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>
            <h4>Contact Us</h4>
            <p>If you have any questions about these Terms and Conditions, You can send us an email: <span>support@racoins.cc</span> </p>
        </div>
       );
}
