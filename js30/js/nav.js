let nav = `
<h1 class="logo"><a href="../index.html">LOGO</a></h1>

<ul class="menu">
                <!--- item1 -->
                <li class="menu__item">
                    <a class="item__link" href="../Home/index.html">Home</a>
                </li>
    
                <!--- item 2 --->
                <li class="menu__item dropdown__item">
                    <a class="item__link">js30(1~10)</a>
                    <!-- dropdown menu -->
                    <ul class="dropdown__menu">
                        <li class="menu__item">
                            <a class="item__link" href="../01-JSDrumkit/index.html">JavaScript Drum kit</a>
                        </li>
                        <li class="menu__item">
                            <a class="item__link" href="../02-CSS+JS Clock/index.html">CSS+JS Clock</a>
                        </li>
                        <li class="menu__item">
                            <a class="item__link" href="../03-css variables and js/index.html">css variables and js</a>
                        </li>
                        <li class="menu__item dropdown__subItem">
                            <a class="item__link">3~10</a>
                            <ul class="dropdown__subMenu">
                                <li class="menu__item">
                                    <a class="item__link" href="../02-JSDrumkit/index.html">3</a>
                                </li>
                                <li class="menu__item">
                                    <a class="item__link">4</a>
                                </li>
                                <li class="menu__item">
                                    <a class="item__link">5</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
    
                <!-- item 3 -->
                <li class="menu__item">
                    <a class="item__link">
                         Products
                    </a>
                </li>
    
                <!--- item 4 --->
                <li class="menu__item dropdown__item">
                    <a class="item__link">Analytics</a>
                    <!-- dropdown menu -->
                    <ul class="dropdown__menu">
                        <li class="menu__item">
                            <a class="item__link">Overview</a>
                        </li>
                        <li class="menu__item dropdown__subItem">
                            <a class="item__link">Transactions</a>
                            <ul class="dropdown__subMenu">
                                <li class="menu__item">
                                    <a class="item__link">Documents</a>
                                </li>
                            </ul>
                        </li>
                        <li class="menu__item dropdown__subItem">
                            <a class="item__link">Reports</a>
                            <ul class="dropdown__subMenu">
                                <li class="menu__item">
                                    <a class="item__link">Payments</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
    
                <!--- item 5 --->
                <li class="menu__item dropdown__item">
                    <a class="item__link">Users</a>
                    <!-- dropdown menu -->
                    <ul class="dropdown__menu">
                        <li class="menu__item">
                            <a class="item__link">Profiles</a>
                        </li>
                        <li class="menu__item dropdown__subItem">
                            <a class="item__link">Accounts</a>
                            <ul class="dropdown__subMenu">
                                <li class="menu__item">
                                    <a class="item__link">Business</a>
                                </li>
                            </ul>
                        </li>
                        <li class="menu__item dropdown__subItem">
                            <a class="item__link">Messages</a>
                            <ul class="dropdown__subMenu">
                                <li class="menu__item">
                                    <a class="item__link">Individual</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
`;