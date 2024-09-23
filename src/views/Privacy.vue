<template>
  <nav-bar
    v-if="type === 'h5'"
    left-text="Privacy Policy"
    left-arrow
    fixed
    placeholder
    safe-area-inset-top
    @click-left="onBack"
  />
  <div class="privacy">
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >_______________</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center">
      <span style="font-family: 'PingFang SC'">Privacy Policy</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >Mojo Code Technology Inc. (“</span
      ><span style="font-family: 'PingFang SC'; font-weight: bold">Company</span
      ><span style="font-family: 'PingFang SC'"
        >”), its officers, employees, assigns, and related companies in the
        conduct of its business greatly value the privacy and security of all
        MojoMojo Users as well as any person who use, access, download, browse,
        or register with the MojoMojo service on the PlayStore, App Store or
        MojoMojo website, its application (“</span
      ><span style="font-family: 'PingFang SC'; font-weight: bold"
        >MojoMojo Application</span
      ><span style="font-family: 'PingFang SC'"
        >”), or other related digital medium or media including social media
        (“</span
      ><span style="font-family: 'PingFang SC'; font-weight: bold"
        >MojoMojo Facility</span
      ><span style="font-family: 'PingFang SC'"
        >”) in full compliance with Republic Act No. 10173 otherwise known as
        the Data Privacy Act of 2012 as well as its Implementing Rules and
        Regulations. This Privacy Policy sets out the guidelines of the Company,
        its officers, employees, assigns, and related companies in relation to
        any and all types of personal information described herein, including
        sensitive personal information.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >All names and other information, which relate to Users shall be handled
        in the manner set out in this Privacy Policy. We shall only collect
        information when it becomes necessary for us to do so and we shall only
        collect information if it is relevant in our dealings with Users. We
        shall only keep User information for as long as we are either required
        by law or as it is relevant for the purposes for which the said
        information was collected.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >You may visit the MojoMojo Facility and freely browse without having to
        provide any personal details. During your visits to the MojoMojo
        Facility, you may choose to remain anonymous and at no time can we
        identify the Users of the MojoMojo Facility unless you have a registered
        MojoMojo Account and logged in using your username and password.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >When you use the MojoMojo service with the MojoMojo Facility whether
        via the PlayStore, App Store, or MojoMojo website or MojoMojo
        Application, you completely agree to this Privacy Policy and the
        processing of your personal information, including your Personal Data,
        in the manner provided in this Privacy Policy. If you do not agree to
        these terms, please discontinue and immediately exit the MojoMojo
        Facility.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 12pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >How are your personal data collected and handled?</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >When a User uses the MojoMojo Facility, creates or registers an
        account, utilizes or operates the MojoMojo Application, pays using a
        bank, a payment gateway or a payment provider or when a User avails of
        any other feature or products and services of the MojoMojo Facility and
        those provided by its service providers, the following personal
        information (“</span
      ><span style="font-family: 'PingFang SC'; font-weight: bold"
        >Personal Data</span
      ><span style="font-family: 'PingFang SC'">”) may be collected:</span>
    </p>
    <p style="margin-top: 0pt; text-indent: 25px; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >(1) full name, permanent and residential address, contact number/s,
        email address, birth date and/or age, gender, employment information,
        bank account details, credit card and/or financial account information,
        financial history and details of government-issued identifications with
        or without picture, and other information from which the User’s identity
        may not be apparent or which may not reasonably and directly identify
        the User, such as records of the User’s visits and information submitted
        when using the Site;</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >(2) social media, e-commerce, transportation, or other online/mobile
        account details and other information from which the User’s identity may
        or may not be apparent or which may not reasonably and directly identify
        the User, such as, but not limited to, records of the User’s visits and
        information submitted when using the MojoMojo Facility;</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt text-align: justify;">
      <span style="font-family: 'PingFang SC'"
        >(3) information from third parties including information obtained, upon
        the the the User’s authorization, from third-party sources holding
        information any financial, transactions, or payment records of the User,
        historical transactions that the User made or on the User’s
        behalf;</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >(4) traffic, usages, devices, locations, travel, gps and other
        information generated, collected, stored or found in the User’s device,
        medium, a portal, or any other medium of access to the MojoMojo
        Facility; and/or</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >(5) anonymous, technical, network and interaction data generated or
        available in the device or any other access medium used to access or
        make use of the MojoMojo Facility.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >The above information shall be obtained (from the User or on the User’s
        behalf from other sources) upon the User’s registration over the
        MojoMojo Facility or upon the User’s application to avail of any
        MojoMojo products and services and the information shall be collected,
        used, processed, disclosed, retained, stored, and protected by the
        Company in accordance with this Privacy Policy and the MojoMojo Terms of
        Service.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'"
        >The Personal Data may be collected through the following means:</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >(1) Personal Data provided by the User during and as part of the User’s
        registration or when the User uses any product or service in the
        MojoMojo Facility;</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >(2) when the User interacts with the MojoMojo Facility’s customer
        service officers;
      </span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >(4) when the User chooses to avail of, use or to subscribe to
        third-party services through the MojoMojo Facility;</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >(3) when the User signs up for MojoMojo ’s services using his/her media
        account or link the MojoMojo Account to the User’s social media,
        e-commerce, transportation or other online/mobile account or use certain
        other features of the MojoMojo Facility;</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >(4) when the User requests to be contacted or be included in an email
        or other mailing list;</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >(5) when the User responds to the Company or the MojoMojo Facility’s
        promotions, initiatives or to any request for additional Personal
        Data;</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >(6) when the User is contacted and respond to by the Company or the
        MojoMojo Facility’s marketing representatives and customer service
        officers;</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >(7) when the Company receives references from business partners and
        third parties, for example, where Users have been referred by
        them;</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >(8) when the Company or its affiliates seek information from third
        parties about the User in connection with the products and services in
        the MojoMojo Facility;</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >(9) Personal Data collected from publicly available sources, including
        but not limited to social media, public repositories, websites, and
        similar sources;</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >(10) In accordance with the Authorization and Consent to Collection
        below, Personal Data obtained, on a User’s behalf, from third parties
        with whom the User transacts, from whom the User availed of, is
        currently using, or have obtained a service or a product; and/or</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >(11) Information collected using cookies, web beacons, web crawlers,
        flash cookies, general log information, mobile and browser information,
        User browsing behavior, User searches and transactions and referral
        information.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >What kind of information should you submit?</span
      ><span style="font-family: 'PingFang SC'"> </span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >You must submit to us information including Personal Data which is
        true, correct, accurate and not false, erroneous or misleading and you
        must keep it up to date and inform us of any changes. We reserve the
        right to request proper documentation to verify the information provided
        by you.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >How do you submit Personal Information / Personal Data</span
      ><span style="font-family: 'PingFang SC'">?</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >We will only be able to collect your Personal Data if you voluntarily
        submit the particular information to us. If you choose not to submit
        your Personal Data to us or subsequently withdraw your consent to our
        use of your Personal Data, we may be unable to provide you with some or
        all of the services available through the MojoMojo Application or
        MojoMojo Facility. You may access and update your Personal Data
        submitted to us at any time.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >What is the relation of my social media accounts with my MOJOMOJO
        account?</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >When you sign up for MojoMojo using your social media, e-commerce,
        transportation or other online/mobile account (the “Online Account”) or
        link your MojoMojo Account to your Online Account or use certain other
        MojoMojo Facility features, we may access information about you (and in
        linking your MojoMojo Account to your</span
      ><span style="font-family: 'PingFang SC'; -aw-import: spaces"
        >&#xa0; </span
      ><span style="font-family: 'PingFang SC'"
        >Online Account you consent to us in doing so) which you have
        voluntarily provided to the Online Account provider in accordance with
        the provider’s policies and we will manage your Personal Data which we
        have collected in accordance with the MojoMojo Privacy Policy.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >How does my use of MOJOMOJO relate to IOS and Android Platform?</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >When you use the MojoMojo Application on a mobile platform, we may
        collect and record certain information such as your unique device ID
        (persistent/non-persistent), the hardware type, media access control
        (“</span
      ><span style="font-family: 'PingFang SC'; font-weight: bold">MAC</span
      ><span style="font-family: 'PingFang SC'"
        >”), address, international mobile equipment identity (“</span
      ><span style="font-family: 'PingFang SC'; font-weight: bold">IMEI</span
      ><span style="font-family: 'PingFang SC'"
        >”), the version of your operating system (“</span
      ><span style="font-family: 'PingFang SC'; font-weight: bold">OS</span
      ><span style="font-family: 'PingFang SC'"
        >”), your device name, your email address, your profile information (if
        connected to any social media account including Facebook), and your
        location based on your Internet Protocol (“</span
      ><span style="font-family: 'PingFang SC'; font-weight: bold">IP</span
      ><span style="font-family: 'PingFang SC'"
        >”) address. This information is useful to us for troubleshooting and
        helps us to understand usage trends. Whenever you use the MojoMojo
        Application, we may collect data about all of your interactions with the
        MojoMojo Application or usage of certain features of the MojoMojo
        Facility via server log files. This data is stored offshore within our
        cloud server.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >What is my log data and how will it be used?</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >When a User or visitor visits the MojoMojo Facility, the User’s or
        visitor’s browser may send the Company Personal Data which the Company
        collects for statistical and internal record-keeping purposes. The
        process of collecting this information is called “Log Data”, and may
        include information such as the computer’s IP address, browser type,
        browser version, the visited pages of the MojoMojo website, the time and
        date of the visit, time spent on the pages or other channels of the
        MojoMojo Facility including the MojoMojo Application, and other
        statistics.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >What are the other ways to collect my personal information?</span
      ><span style="font-family: 'PingFang SC'"> </span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >We may also acquire information or Personal Data from you through: (1)
        your access and participation in the MojoMojo service and/or the
        MojoMojo Application or Facility; (2) your participation in surveys
        regarding the MojoMojo service and/or the MojoMojo Application or
        Facility; and/or (3) your participation in a promo or contest through
        the MojoMojo service and/or the MojoMojo Application or Facility.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >What are cookies?</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >A cookie is a small text file which asks permission to be placed on the
        visitor’s computer hard drive. A cookie may be transferred to your
        computer or device, to identify a user’s computer or device and to
        “remember" things about your visit through your computer or device, such
        as your preferences or your user name and password. Once the visitor
        agrees, the file is added and the cookie helps analyze web traffic or
        provides internet usage information. Information contained in a cookie
        may be linked to your Personal Data for purposes such as improving the
        quality of the MojoMojo service, tailoring recommendations to your
        interests, and making the MojoMojo service easier to use. A visitor can
        instruct his or her browser to refuse all cookies or to indicate when a
        cookie is being sent. You can disable cookies at any time, although in
        doing so, you may be unable to access or use some or all of the features
        of the MojoMojo service or the MojoMojo Application. A cookie in no way
        gives the Company access to the visitor’s computer or any information
        about the visitor, other than the data the visitor chooses to share with
        the Company.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >We may feature recommendations served by third parties that deliver
        cookies to your computer or device so the content you access and
        recommendations you see can be tracked.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >What are third-party recommendations?</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >We may feature product and retail partner information within the
        MojoMojo service or the MojoMojo Application or Facility. The partner
        may collect and use information about you or your computer or device,
        such as your MojoMojo service session activity, device identifier, MAC
        address, IMEI, geo-location information and IP address. They may use
        this information to provide recommendations or product information of
        interest to you. Since third-party partner companies associate your
        computer or device with a number, they will be able to recognize your
        computer or device each time they send you recommendations or product
        information. These partners may (if you provided your consent and
        accepted their terms or use, privacy policy or similar document) use
        information about your visit to the MojoMojo Application or MojoMojo
        Facility for the MojoMojo service and third-party sites and applications
        by your computer or device in order to measure your interaction and
        response to the recommendations and/or product information for tracking
        purposes performance and to provide you with better and more appropriate
        recommendations or product information about goods and service of
        interest to you. In addition, you may see the MojoMojo service or
        MojoMojo Application advertised in other services or facilities. After
        clicking on them, you may register to become a user of the MojoMojo
        service. This Privacy Policy does not apply to them and we are not
        responsible for the data collection practices of these third-party
        partners, and we encourage you to check their privacy policies to learn
        more about their use of cookies and other technology.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >What are third-party tracking tools?</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >Our service may contain third-party tracking tools from our service
        providers. Such third parties may use cookies, APIs and SDKs in our
        services to enable them to collect and analyze user information on our
        behalf. The third parties may have access to information such as your
        device identifier, MAC address, IMEI, locale (specific location where a
        given language is spoken), geo-location information, and IP
        address.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >What is your responsibilities over Third-Party Personal Data that you
        supply to us?
      </span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >If you provide us with any Personal Data relating to third-party
        individuals (e.g. information of your spouse, children, parents, and/or
        employees, etc.), including those submitted for Related Party Contact
        and Third Party Contact, and other references, by submitting such
        information to us, you represent and warrant that you have obtained all
        the necessary consent of the third-party to provide us with their
        Personal Data for the respective purposes in accordance with this
        Privacy Policy (including sharing and disclosure of information to such
        third parties, if necessary) for the use by the Company and the lender
        such that it is considered as legally obtained by the Company and the
        lender, for the purposes and use as enumerated in this Privacy
        Policy.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >The Personal Data may be processed on behalf of the Company by personal
        information or personal data processors including the lender, in each
        case mindful of Users’ and data subjects’ rights and the Company’s
        obligations under the Data Privacy Act of 2012.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >How do you give your authorization and consent to collection of
        information including personal data?</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >The User expressly and unconditionally consents to the access,
        possession, collection, storage, processing, use, analysis and/or
        distribution, disclosure, display, and delivery of any information
        (including Personal Data) related to the User, and to the transfer of
        such information to any third parties, including, but not limited to,
        the organizer/operator of payment facilities, third-party service
        providers, and third-party sellers.</span
      ><span style="font-family: 'PingFang SC'; color: #ff0000"> </span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >By downloading and using the MojoMojo Application and/or the MojoMojo
        Facility, the User hereby expressly gives consent and authorization and
        is deemed to make the following statement:</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >“By registering to MojoMojo I hereby give consent to the collection and
        processing of my personal information for legitimate business purposes.
        I hereby certify that all the information provided by me is true and
        correct to the best of my knowledge, and that any misrepresentations or
        falsity therein will be considered as an act to defraud MojoMojo
        (COMPANY), its partners and affiliates. I hereby authorize the COMPANY
        to verify and investigate the above statements/information as may be
        required, from the references provided and other reasonable sources. For
        this purpose, I hereby waive my rights on the confidentiality of client
        information and expressly consent to the processing of any personal
        information and records relating to me that might be obtained from third
        parties and other entities you may deem proper and sufficient in the
        conduct of my business, sensitive or otherwise, in accordance with
        Republic Act No. 10173.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >The User hereby consents to and authorizes Company and/or their
        third-party partners for the purpose of providing the Services,
        including conducting user profiling, identify check and verification,
        fraud detection, monitoring and prevention from whatever relevant
        source. The User further acknowledges, understands, accepts and agrees
        that the User’s Personal Data may be shared to a business and/or or
        marketing partner, corporate (i.e. registration using a referral code,
        link, banner or similar referral identification method) or individual
        who have referred the User to register, obtain a loan or otherwise
        obtain or avail of the services from the MojoMojo Facility using a
        unique identifier (i.e. reference code) for such corporation or
        individual.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >What are the uses/purposes of personal data?</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'"
        >The Personal Data shall be processed, collected, used, disclosed,
        stored and retained for the following purposes:</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'">i. to identify Users;</span>
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'"
        >ii. to contact Users in relation to their registered account/s or
        requested information;</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'"
        >iii. to process registration of account/s as part of screening of the
        investors, borrowers, and loan applications;</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'"
        >iv. to maintain internal records;</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'"
        >v. to market and offering new, related or complementary products and
        services to the User;</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'"
        >vi. to conduct and perform fraud monitoring, detection, analysis and
        prevention;</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'"
        >vii. to prevent, detect and investigate actual or suspected crime and
        analyzing and managing commercial risks;</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'"
        >viii. to conduct data analytics and tracking;</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'"
        >ix. to conduct market research to enable Company to understand and
        determine customer location, preferences and demographics to develop
        special offers, products or marketing programs in relation to products
        and services, and to improve (i.e. customized offers and products) such
        products and services</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'"
        >x. to conduct investigations relating to disputes, payment, suspected
        illegal activities or fraud;</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'"
        >xi. to carry out marketing and promotions initiatives relating to the
        Company, local affiliates of the Company, Company’s partners, and
        Company’s products and services, whether by electronic means, by email
        and post, or by telephone, SMS or social media, or by sending
        newsletters (for example, for the Users to be updated on new products or
        features and to publicize events, contests, demonstrations, loyalty
        programs, and other activities organized by Company ), also by using
        automated means. Such communications will relate to products and
        services of the financial products, services and the like. In addition,
        Company will process and share User data for market research,
        statistical analyses, or other research to improve its products,
        development of new products and customer satisfaction analysis;</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'"
        >xii. to analyze User behavior or for user profiling, (e.g. in relation
        to financing products availed, provided, viewed, and searched) in order
        to improve, and develop better products and services in the
        Facility.</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'"
        >xiii. to develop, enhance and maintain a risk assessment process and
        model, offline and online;</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'"
        >xiv. to execute, monitor, manage and analyze the MojoMojo Facility and
        to develop, enhance, and upgrade the features, functions, products and
        services in the MojoMojo Facility, including promotions, loyalty and
        reward programs;</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'"
        >xv. to respond to your queries and requests;</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'"
        >xvi. to facilitate business asset transactions (which may extend to any
        mergers, acquisitions or asset sales) of the</span
      ><span style="font-family: 'PingFang SC'; -aw-import: spaces"
        >&#xa0; </span
      ><span style="font-family: 'PingFang SC'">Company;</span>
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'"
        >xvii. to initiate and maintain correspondence with the User via
        electronic mail (e-mail), SMS (short messaging service), registered
        mail, phone calls or field visits;</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'"
        >xviii. to resolve complaints and handling requests and inquiries;</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'"
        >xix. to monitor or record phone calls and customer-facing interactions
        for quality assurance, employee training and performance evaluation and
        identity verification purposes;</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'"
        >xxi. to provide information to external parties such as government
        agencies, and other institutions as part of scientific research and/or
        study; and</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'"
        >xxii. for any other legal and/or regulatory purposes (including but not
        limited to obtaining legal advice and dispute resolution) and legitimate
        business purposes and to carry out all mandatory administrative,
        operational and legal duties applicable to Company, the Company and its
        subsidiaries and affiliates pursuant to the prevailing laws and
        regulations.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'"
        >As some practical examples in connection with the above-mentioned uses
        and purposes, we may use information of Users to:</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >a. allow log-ins and making of purchases over marketplace platforms
        which are operated under or under affiliation with the MojoMojo
        service;</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >b. identify and recommend products and services available through or in
        association with the MojoMojo Facility and/or the MojoMojo
        Application;</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >c. operate and improve the MojoMojo Service and/or the MojoMojo
        Application;</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >d. understand User preferences to enhance User experience and enjoyment
        using the MojoMojo Service and/or the MojoMojo Application;</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >e. respond to User comments and questions or requests;</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >f. provide and deliver products and service based on User request or
        demand;</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >g. send related information, including confirmations, technical
        notices, updates, security alerts, support and administrative messages
        to Users;</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >h. communicate to Users about promotions, reward, upcoming events, and
        other news about products and services offered by MojoMojo and selected
        partners of MojoMojo; and</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >i. link or combine with other information provided to us from third
        parties, to help understand User preferences with the aim of providing
        Users with better services.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >When can personal data be shared?</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >Your Personal Data may be shared with the Company and its affiliates in
        the conduct of its business for processing as may be required in the
        maintenance and performance of its duties and responsibilities under the
        MojoMojo Facility, in accordance with applicable laws, rules and
        regulations. The Company or entities which are its subsidiaries or
        within its affiliate network may, as necessary, be engaged by Company as
        subcontractors or data processors in each case with respect to the
        purposes enumerated above.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'"
        >In general, User Personal Data may be disclosed to the following:</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'"
        >(a) the Company’s affiliates and subsidiaries, agents and
        subcontractors;</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'"
        >(b) the government, regulatory agencies, and fraud prevention agencies
        for purposes of identifying, preventing, detecting or tackling fraud,
        money laundering, or other crimes, and/or for other lawful
        purposes;</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'"
        >(c) other entities as may be required by law or when the Company
        believes that release is appropriate to comply with the law, enforce, or
        to apply the Company’s rights, or to protect the right, property of
        safety of the Company, the MojoMojo Facility or MojoMojo Users. This
        includes exchanging information with other companies, organizations or
        regulatory agencies for fraud protection;</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'"
        >(d) as the public interest may warrant, for the purposes identified
        herein in the manner set out in this Privacy Policy;</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'"
        >(e) third parties (e.g. aggregator platforms, payment gateways, payment
        providers, collection agents and banks) who are engaged, used, or is
        otherwise authorized by either the lender or the borrower to provide any
        support or service with respect to any transaction concluded by the
        lender and borrower; and</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >You, as a User, hereby acknowledge and agree that the Company may share
        any and all information relating to you as a User to third parties for
        purposes provided under this Privacy Policy, for any legitimate business
        purpose including, but not limited to, fraud detection, fraud
        prevention, fraud monitoring, product and systems development, sales and
        marketing activities, communications relating to the development of
        their products and/or services, and the like.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >All data processing, subcontracting or data sharing agreements will be
        in accordance with the requirements under the Data Privacy Act of 2012,
        or applicable laws and regulations as may be hereafter passed and
        implemented. To the extent that such processing, subcontracting, or data
        sharing requires notice or consent, we will provide or request for such
        notice and/or consent, in each case, prior to any processing or sharing
        of your Personal Data.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >Please note that should you agree to sharing of any information with
        other third parties for their own marketing purposes, handling of your
        Personal Data shall be subject to their separate privacy policies and
        should you wish to opt-out of marketing or promotional emails from these
        third parties, you should contact these parties directly.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >We may release your information including Personal Data as permitted by
        law or when we believe that release is appropriate to comply with the
        law; enforce or apply our rights; or protect the rights, property, or
        safety of us or our users, or others. This includes exchanging
        information with other companies and organizations for fraud protection.
        We may share your information in connection with any merger, sale of our
        assets, or a financing or acquisition of all or a portion of our
        business to another Company. We may share aggregate or anonymous
        information about you with advertisers, publishers, business partners,
        sponsors, and other third parties.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >On occasion, we may share to or obtain user-level data collected about
        you from third parties (including affiliates), for purposes beyond the
        specific examples noted in this Privacy Policy. User-level data is
        information that is associated with your specific device and is not
        aggregated with other data. For example, we may share to or obtain data
        from third-party data that reveals that you have viewed certain sites or
        used certain apps or features, but you will not be personally identified
        with such information. Rather, the user-level data will be associated
        with an anonymous identifier.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >How will your personal data be stored?</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >The data including Personal Data that we collect from you may be
        transferred to, and stored at, a destination outside the Philippines. It
        may also be processed by staff operating outside the Philippines who
        work for us or for any of our suppliers. These staff members may be
        engaged in the fulfillment of your requests. By submitting your Personal
        Data, you agree to this transfer, storing or processing of data. We will
        take all steps reasonably necessary to ensure that your data is treated
        safely and securely and in accordance with this Privacy Policy. We may
        also disclose your data to anyone we consider necessary in order to
        provide you with services in connection with an account.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >Where we have given you (or where you have chosen) a password or PIN
        that enables you to access certain parts of the MojoMojo Facility, you
        are responsible for keeping this password confidential. We ask you not
        to share your password with anyone. Unfortunately, the transmission of
        information via the internet is not completely secure. Although we will
        do our best to protect your Personal Data, we cannot guarantee the
        security of your data transmitted through the MojoMojo Facility, and any
        transmission is at your own risk. Once we have received your
        information, we will use strict procedures and security features to
        prevent unauthorized access to your account.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >How will your personal data be retained?
      </span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >Your Personal Data will be retained by the Company for the duration of
        your activities and transactions in connection with the products and
        services availed of in this MojoMojo Facility and/or for such period of
        time required for legal and regulatory and/or other legitimate business
        purposes, and will be disposed of in a secure manner that would prevent
        further processing, unauthorized access or disclosure to any other party
        or the public or prejudice your interest, provided that the Company may
        retain copies of your Personal Data in the Company’s archives for the
        purpose of determining its continuing obligations or pursuant to its
        bona fide record retention or data back-up policies, access to which
        shall be restricted on a need-to-know basis, as may be required under
        applicable laws and regulations.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >How does the Company secure your personal data?</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >Since the Company values Personal Data collected, used, retained and
        stored through the MojoMojo Facility, it has adopted technical,
        organizational and physical measures to protect your Personal
        Data,</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >We take reasonable measures to protect your information from
        unauthorized access or against loss, misuse, or alteration by third
        parties.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >Although we make good faith efforts to store the information collected
        on the MojoMojo Facility and/or the MojoMojo Application in a secure
        operating environment that is not available to the public, we cannot
        guarantee the absolute security of that information during its
        transmission or its storage on our system. Further, while we attempt to
        ensure the integrity and security of our network and systems, we cannot
        guarantee that our security measures will prevent third-party “hackers"
        from illegally obtaining access to this information. We do not warrant
        or represent that your information will be protected against, loss,
        misuse, or alteration by third parties.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >How do you access and correct your personal data?</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >If you wish to exercise your right to access, correction, cancellation,
        portability and objection rights as described below, or for complaints
        and other inquiries, please email MojoMojo to the attention of Data
        Privacy Officer:</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >(a) to receive details of the source of the data, the purposes and
        methods of the processing, the logic applied to the processing, or if
        the latter is carried out with the help of electronic means, of the
        identity of data controller and data processors, the entities or
        categories of entity to which the data may be communicated and which may
        become aware of the data;</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >(b) to update, correct, supplement, or delete the data, to block or
        render anonymous data that have been processed unlawfully, including
        data whose retention is unnecessary for the purpose for which such data
        have been collected or subsequently processed; to have a certification
        that the operations requested have been completed, as also related to
        their contents, to the entities to which the data were communicated,
        this requirement proves impossible or involves a manifestly
        disproportionate effort compared with the right that is to be protected;
        to receive Personal Data concerning you and copy or transmit it to
        another data controller (right to data portability); and</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >(c) to object, on legitimate grounds, to the processing of data,
        despite the data being relevant to the purposes for which they were
        collected or to object, also partially (e.g. only in relation to certain
        communication means), to the data being processed in order to send
        advertising materials or for direct sales, or market research, or
        commercial information, profiling purposes, or to receive communications
        by traditional means only.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >Please note that if your Personal Data has been provided to us by a
        third-party (e.g. a referrer), you should directly contact that
        organization or individual to make such queries, complaints, access and
        correction requests.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >How can you exercise control over your personal data?</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >Users retain control over their Personal Data, and may amend their
        Personal Data registered over the MojoMojo Facility database.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >The User shall be responsible for maintaining the confidentiality of
        his or her own MojoMojo account and password, as well as any and all
        applications submitted, obligations agreed to or entered into and all
        other activities occurring under the said account. The User agrees to
        immediately notify the Company of any unauthorized use or disclosure of
        the User’s account or password, any unauthorized activities under the
        User’s MojoMojo Account or any other breach of security.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'">The Company and/or </span
      ><span style="font-family: 'PingFang SC'; -aw-import: spaces">&#xa0;</span
      ><span style="font-family: 'PingFang SC'"
        >its officers and employees shall not be liable for any loss that the
        User may incur as a result of a third-party’s use of the User’s MojoMojo
        Account or password, either with or without the User’s knowledge,
        without fault or negligence on the part of the Company and/or the its
        officers and employees .</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >The User may be held liable for any damages or losses incurred by the
        Company and/or the its officers and employees in connection with or
        arising from a third-party’s use of the User’s MojoMojo Account or
        password, without fault or negligence on the part of the Company and/or
        the its officers and employees .</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >What are the implications of third-party service?</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >Our service may contain third-party tracking tools from our service
        providers. Such third parties may use cookies, APIs and SDKs in our
        services to enable them to collect and analyze user information on our
        behalf. The third parties may have access to information such as your
        device identifier, MAC address, IMEI, locale (specific information where
        a given language is spoken), geo-location information, and IP
        address.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >Can you opt out of marketing communication?</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >You may opt-out of receiving promotional emails or other notification
        channels from us by following the instructions in those emails or
        notification channels. If you opt out, we may still send you
        non-promotional emails or notifications, such as emails or notifications
        about your accounts or pertaining to our ongoing business including
        where due notices are required under law or regulation, for the purposes
        of User protection, or in the circumstances the Company deems that it is
        necessary to keep Users updated via written notice. Please note that
        should you agree to sharing of information with other third parties for
        their own marketing purposes, handling of your Personal Data shall be
        subject to their separate privacy policies and should you wish to
        opt-out of marketing through promotional emails or other notification
        channels from these third parties, you should contact these parties
        directly.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >What are your obligations as user?</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >You agree to inform us promptly, and in any event, in writing if there
        are any changes to your information supplied to us from time to time,
        and to respond promptly to any request from us.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'">Where:</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >(a) you fail to provide promptly any user information or Personal Data
        that we reasonably requested;</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >(b) you withhold or withdraw any consents that we may need to process,
        transfer or disclose Personal Data for the purposes of used disclosed
        above in this Privacy Policy (except for purposes connected with
        marketing or promoting products and services to you); and/or</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >(c) we have, or a member of the Company has, suspicions regarding
        financial crime or an associated risk.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'">We may:</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >(a) be unable to provide new, or continue to provide all or part of
        the, MojoMojo service to you and reserve the right to terminate our
        relationship with you;</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >(b) take actions necessary for us or a member of the Company to meet
        the compliance or regulatory obligations; and/or</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >(c) suspend, transfer or close your account(s) where permitted under
        local laws.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >What are your data privacy information rights?</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'"
        >Users have the following rights regarding Personal Data:</span
      >
    </p>
    <p style="margin-top: 0pt; text-indent: 25px; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'">1.1 </span
      ><span style="font-family: 'PingFang SC'; font-weight: bold"
        >Right to Request Special Privacy Protections</span
      ><span style="font-family: 'PingFang SC'"
        >. You have the right to request restrictions on certain uses and
        disclosures of your Personal Data by a written request specifying what
        information you want to limit, and what limitations on our use or
        disclosure of that information you wish to have imposed. If you tell us
        not to disclose information, we will abide by your request, unless we
        must disclose the information for treatment or legal reasons. We reserve
        the right to accept or reject any other request, and will notify you of
        our decision.</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'">1.2 </span
      ><span style="font-family: 'PingFang SC'; font-weight: bold"
        >Right to Inspect and Copy</span
      ><span style="font-family: 'PingFang SC'"
        >. You have the right to inspect and copy your Personal Data, with
        limited exceptions. To access your Personal Data, you must submit a
        written request detailing what information you want access to, whether
        you want to inspect it or get a copy of it, and if you want a copy, your
        preferred form and format. We will provide copies in your requested form
        and format if it is readily producible, or we will provide you with an
        alternative format you find acceptable, or if we can’t agree and we
        maintain the record in an electronic format, your choice of a readable
        electronic or hard copy format. We will also send a copy to any other
        person you designate in writing. We will charge a reasonable fee which
        covers our costs for labor, supplies, postage, and if requested and
        agreed to in advance, the cost of preparing an explanation or summary.
        We may deny your request under limited circumstances. If we deny your
        request to access your personal records or the personal records of an
        individual you are representing because we believe allowing access would
        be reasonably likely to cause substantial harm to the customer, you will
        have a right to appeal our decision.</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'">1.3 </span
      ><span style="font-family: 'PingFang SC'; font-weight: bold"
        >Right to Request Confidential Communications</span
      ><span style="font-family: 'PingFang SC'"
        >. You have the right to request that you receive your Personal Data in
        a specific way or at a specific location. You may ask that we send
        information to a particular e-mail account or to your work address. We
        will comply with all reasonable requests submitted in writing which
        specify how or where you wish to receive these communications.</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'">1.4 </span
      ><span style="font-family: 'PingFang SC'; font-weight: bold"
        >Right to Amend or Supplement</span
      ><span style="font-family: 'PingFang SC'"
        >. You have a right to request that we amend your Personal Data that you
        believe is incorrect or incomplete. You must make a request to amend in
        writing, and include the reasons you believe the information is
        inaccurate or incomplete. We may deny your request if we do not have the
        information, if we did not create the information, if you would not be
        permitted to inspect or copy the information at issue, or if the
        information is accurate and complete as is. All information related to
        any request to amend will be maintained and disclosed in conjunction
        with any subsequent disclosure of the disputed information.</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'">1.5 </span
      ><span style="font-family: 'PingFang SC'; font-weight: bold"
        >Right to Revoke Authorization</span
      ><span style="font-family: 'PingFang SC'"
        >. Your consent is necessary before the Company can lawfully collect and
        process your Personal Data. You may revoke (take back) your consent at
        any time. For the avoidance of doubt, this does not invalidate any
        previous processing that the Company has performed in accordance with
        consent originally given.</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'">1.6 </span
      ><span style="font-family: 'PingFang SC'; font-weight: bold"
        >Right to Erasure or Blocking</span
      ><span style="font-family: 'PingFang SC'"
        >. You have the right to suspend, withdraw or order the blocking,
        removal or destruction of your Personal Data. You can exercise this
        right upon discovery and substantial proof of any of the
        following:</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >i. Your Personal Data is incomplete, outdated, false, or unlawfully
        obtained.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >ii. It is being used for purposes you did not authorize.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >iii. The data is no longer necessary for the purposes for which they
        were collected.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >iv. You decided to withdraw consent, or you object to the processing
        and there is no overriding legal ground for processing.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >v. The data concerns information prejudicial to the customer — unless
        justified by freedom of speech, of expression, or of the press; or
        otherwise authorized by law.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >vi. The processing is unlawful.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >vii. The COMPANY or its Personal Data processor/s, violated your rights
        as a customer.</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'">1.7 </span
      ><span style="font-family: 'PingFang SC'; font-weight: bold"
        >Right to Be Notified of a Breach</span
      ><span style="font-family: 'PingFang SC'"
        >. You have the right to receive notifications of breaches of your
        Personal Data, as may be required by law. Aside from protecting you
        against unfair means of Personal Data collection, this right also
        requires the Company to notify you in a timely manner if your Personal
        Data has been compromised. If you have provided us with a current e-mail
        address, we may use e-mail to communicate information related to the
        breach.</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'">1.8 </span
      ><span style="font-family: 'PingFang SC'; font-weight: bold"
        >Right to a Paper or Electronic Copy of this Notice</span
      ><span style="font-family: 'PingFang SC'"
        >. You have a right to be notified of our legal duties and privacy
        practices with respect to your Personal Data, including a right to a
        paper copy of this Privacy Notice, even if you have previously requested
        its receipt by e-mail.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >Disclosure Statement For Users</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'">2.1 </span
      ><span style="font-family: 'PingFang SC'; font-weight: bold">Payment</span
      ><span style="font-family: 'PingFang SC'"
        >. We use and disclose Personal Data about you to other providers under
        or in partnership with the MojoMojo service, with an affiliate Company
        or parent Company and other vendors to obtain payment for the services
        we have provided.</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'">2.2 </span
      ><span style="font-family: 'PingFang SC'; font-weight: bold"
        >Research</span
      ><span style="font-family: 'PingFang SC'"
        >. You agree that your Personal Data may be used and disclosed for
        research purposes; provided, that access is granted strictly on a need
        to know basis to protect customer confidentiality involving Personal
        Data. Separately, your personal records may be used for data analytics
        to create customer demographics and trends; however, these reports are
        generated in such a way that customer identities are anonymized.</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'">2.3 </span
      ><span style="font-family: 'PingFang SC'; font-weight: bold"
        >Marketing</span
      ><span style="font-family: 'PingFang SC'"
        >. We may use your contact details to communicate with you and give you
        information about products or other services provided by MojoMojo, with
        an affiliate Company or parent Company and other business vendors that
        may be of interest to you. We may also contact you to ensure customer
        satisfaction regarding services provided, including identification of
        your concerns so that addressing of issues are assured.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'">2.4 </span
      ><span style="font-family: 'PingFang SC'; font-weight: bold"
        >Required by Law</span
      ><span style="font-family: 'PingFang SC'"
        >. As required by law, we will use and disclose your Personal Data, but
        we will limit our use or disclosure to the relevant requirements of the
        law. When the law requires us to report abuse or respond to judicial or
        administrative proceedings, or to law enforcement officials, we will
        further comply with the requirement set forth below concerning those
        activities. We may disclose your Personal Data to an oversight facility
        for activities authorized by law. These oversight activities include,
        for example, audits, investigations, inspections, and licensure.</span
      >
    </p>
    <p style="margin-top: 0pt; text-indent: 25px; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'">2.5 </span
      ><span style="font-family: 'PingFang SC'; font-weight: bold"
        >Law Enforcement</span
      ><span style="font-family: 'PingFang SC'"
        >. We may, and are sometimes required by law to, disclose your Personal
        Data to a law enforcement official for purposes such as identifying or
        locating a suspect, fugitive, material witness or missing person,
        complying with a court order, warrant, subpoena and other law
        enforcement purposes.</span
      >
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p
      style="
        margin-top: 0pt;
        text-indent: 25px;
        margin-bottom: 0pt;
        text-align: justify;
      "
    >
      <span style="font-family: 'PingFang SC'">2.6 </span
      ><span style="font-family: 'PingFang SC'; font-weight: bold"
        >Other Uses and Disclosures</span
      ><span style="font-family: 'PingFang SC'"
        >: If we wish to use or disclose your Personal Data for a purpose that
        is not discussed in this Privacy Notice, your written consent will be
        requested separately.</span
      >
    </p>
    <p style="margin-top: 0pt; text-indent: 25px; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >Statement For Third-Party Contacts:</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >4.2 In some instances, we share Personal Data with our suppliers,
        including Company entities and other business partners who provide
        services to us, such as IT and technology service providers, marketing
        providers, communication services and printing providers, fraud
        prevention, and credit reference agencies, and others. When we do so we
        take steps to ensure they meet our data security standards, so that your
        Personal Data remains secure.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >4.3 If you no longer wish us to share your Personal Data with such
        person(s) or wish to change your preferences in this respect, please
        email us at MojoMojo. When we provide your Personal Data to any of the
        above recipients, that recipient may process your Personal Data on our
        behalf or for its/his/her own purposes. If the recipient processes the
        Personal Data for its own purposes, it/he/she will be responsible for
        due compliance with any applicable law with regard to your Personal
        Data.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >What should you know about changes on the Company’s privacy
        policy?</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >This Privacy Policy may be updated from time to time and shall continue
        to remain in effect unless otherwise amended. If this Privacy Policy is
        changed, those changes will be posted on the MojoMojo Facility and/or
        the MojoMojo Application. The change will be effective when posted.
        Users availing MojoMojo services and/or visitors to the MojoMojo
        Facility are advised to check the MojoMojo website and/or MojoMojo
        Application on a regular basis to remain aware of the policies and
        practices of how information is collected and used.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >If significant changes to this Privacy Policy will affect certain
        Personal Data, the Company shall notify its Users through the email
        address provided or by posting a public notice on the MojoMojo </span
      ><span style="font-family: 'PingFang SC'; -aw-import: spaces">&#xa0;</span
      ><span style="font-family: 'PingFang SC'"
        >Application and/or MojoMojo Facility.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span
        style="
          width: 60.7pt;
          display: inline-block;
          -aw-tabstop-align: left;
          -aw-tabstop-pos: 60.7pt;
        "
        >&#xa0;</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; color: #ff0000"
        >As of 1 April 2022</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'; font-weight: bold"
        >ACCEPTANCE AND DIGITAL SIGNATURE
      </span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="font-family: 'PingFang SC'"
        >I confirm having read and understood and hereby agree to the foregoing
        MojoMojo Privacy Policy.</span
      >
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; text-align: justify">
      <span style="font-family: 'PingFang SC'"
        >By clicking the “SIGN UP” button of any social media or public
        platforms linked to the MojoMojo service, I understand that I am
        creating a digital signature which signifies my intention to be fully
        and legally bound by said Privacy Policy.
      </span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt">
      <span style="-aw-import: ignore">&#xa0;</span>
    </p>
    <div style="-aw-headerfooter-type: footer-primary; clear: both">
      <p style="margin-top: 0pt; margin-right: 18pt; margin-bottom: 0pt">
        <span style="-aw-import: ignore">&#xa0;</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NavBar } from 'vant'
import useBack from '@/mixins/backPage'
const { type, onBack } = useBack()
</script>

<style lang="less" scoped>
.privacy {
  max-width: 100;
  margin: 0 auto;
  padding: 15px;
  .right {
    text-align: right;
  }
  .title {
    font-size: 20px;
    color: #333;
    text-align: center;
    line-height: 40px;
    padding: 10px;
  }
  .content {
    text-indent: 25px;
  }
  .content em {
    font-style: normal;
    text-decoration: underline;
  }
  .content b {
    color: #333;
    text-decoration: underline;
  }
  .bold {
    font-weight: bold;
  }
  p {
    font-size: 16px;
    color: #333;
    line-height: 24px;
    margin-bottom: 7px;
    word-break: break-all;
  }
}
</style>
