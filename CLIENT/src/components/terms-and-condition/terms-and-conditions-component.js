import React, { Component, useEffect, useState } from 'react';
import MetaTagHelper from '../../helpers/MetaTagHelper';

require('./terms-and-conditions-component.scss');



export default function TermAndConditions(){

    return (
        <div className='terms-and-conditions'>
            <MetaTagHelper title={"Terms & Conditions - Racoins.cc"} description={"Finding new crypto gems made easy with Racoins.cc"}/>
            <h2>Terms and Conditions</h2>
            <p>Last updated: May 20, 2022</p>
            <p>Please read these terms and conditions carefully before using Our Service.</p>
            <ul>
                <li>
                    <h4>Introduction</h4>
                    <p>Welcome to racoins.cc (“Company”, “we”, “our”, “us”, “Service”)!</p>
                    <p>These are the Terms and Conditions(“Terms”, “Terms of Service”) gorverning the use of our website located at Racoins.cc (together “Service”).</p>
                    <p>Our Privacy Policy also governs your use of our Service and explains how we collect, 
                        safeguard and disclose information that results from your use of our web pages.</p>
                    <p>By accessing or using the Service, You agree to be bound by these Terms and Conditions. 
                        If you do not agree with (or cannot comply with) Agreements, the you may not access racoins.cc. 
                        These Terms apply to all visitors, users and others who wish to access or use Service.</p>
                    <p>Your access to and use of the Service is also conditioned on Your acceptance of and compliance with Our Privacy Policy. Please read Racoins' Privacy Policy.</p>
                    
                    <h4>Content on the platform</h4>
                    <p>Our Service allows you to submit, create and upload text, images or other material(“Content”).</p>
                    <p>By submitting, creating or uploading Content on Our Service, You represent that the Content is owned by You and/or you have the right to use it. 
                        We reserve the right to termiate the account of anyone found to be infringing on a copyright</p>
                    <p>You retain any and all of your rights to any Content you submit, post or display on or through Service and you are responsible for protecting those rights. 
                        We take no responsibility and assume no liability for Content you or any third party posts on or through Service. 
                        However, by posting Content using Service you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through Service. You agree that this license includes the right for us to make your Content available to other users of Service, who may also use your Content subject to these Terms.</p>
                    
                    <h4>Advertisement & Promotions</h4>
                    <p>Any coin listed on Advertisement or Promotions are paid. In the case there's scamming or rugpulling, we reserve the right to remove or delist the coin.</p>

                    <h4>Analytics</h4>
                    <p>We may use third-party Service Providers to monitor and analyze the use of our Service.</p>

                    <h4>Link to other Websites and Third Party Service </h4>
                    <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by Racoins.cc.</p>
                    <p>Racoins.cc has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services.
                         You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, 
                         for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content,
                          goods or services available on or through any such web sites or services.
                    </p>
                    
                    <h4>Limitation of Liability</h4>
                    <p>THE USER AGREES TO THE FOLLOWING LIMITATION OF LIABILITY WITH RESPECT TO THE USE OF OUR SERVICE:</p>
                    <p>CACOINS.COM IN NO EVENT SHALL BE HELD RESPONSIBLE OR LIABLE TO YOU OR ANY THIRD PARTY FOR ANY INDIRECT, PUNITIVE, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGE INCLUDING BUT NOT LIMITED TO, 
                        DAMAGES FOR LOSS OF PROFIT, LOSS OF DATA OR OTHER INFORMATION, BUSINESS INTERRUPTION OR FOR PERSONAL INJURY
                    </p>
                    <p>IF THERE IS LIABILITY FOUND ON THE PART OF COMPANY, IT WILL BE LIMITED TO THE AMOUNT PAID FOR THE PRODUCTS AND/OR SERVICES OR 100 USD IF YOU HAVEN'T PAID ANYTHING THROUGH THE SERVICE.</p>

                    <h4>Termination</h4>
                    <p>We may terminate or suspend your account and bar access to Service immediately, without prior notice or liability, 
                        under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of Terms.
                        If you wish to terminate your account, you may simply discontinue using Service.
                    </p>
                    <h4>Governing Law</h4>
                    <p>These Terms shall be governed and construed in accordance with the laws of the country, which governing law applies to agreement without regard to its conflict of law provisions. 
                        Your use of the Application may also be subject to other local, state, national, or international laws
                    </p>
                    <h4>Changes to Thse Terms and Conditions</h4>
                    <p>We reserve the right to withdraw or amend our Service, and any service or material we provide via Service, in our sole discretion without notice.
                         We will not be liable if for any reason all or any part of Service is unavailable at any time or for any period.
                          From time to time, we may restrict access to some parts of Service, or the entire Service, to users, 
                          including registered users.
                    </p>
                    <h4>Amendments to Terms</h4>
                    <p>We may amend Terms at any time by posting the amended terms on this site. It is your responsibility to review these Terms periodically.
                        Your continued use of the Platform following the posting of revised Terms means that you accept and agree to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you.
                        By continuing to access or use our Service after any revisions become effective,
                         you agree to be bound by the revised terms. If you do not agree to the new terms,
                          you are no longer authorized to use Service.
                    </p>
                    <h4>Acknowledgement</h4>
                    <p>BY USING SERVICE OR OTHER SERVICES PROVIDED BY US, 
                        YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY THEM.
                    </p>
                    <h4>Contact Us</h4>
                    <p>If you have any questions about these Terms and Conditions, You can send us an email: <span>support@racoins.cc</span> </p>
                </li>
            </ul>
        </div>
       );
}
