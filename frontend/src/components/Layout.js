import React from 'react';

function Layout({ children }) {
    return (
        <div>
            <head>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>DIARY</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css" />
                <style>
                    {`
                        body {
                            background: linear-gradient(to bottom, #AED6F1, #ABEBC6);
                            background-attachment: fixed;
                            background-size: cover;
                        }
                        .navbar-item {
                            color: #196F3D;
                        }
                        .navbar-item:hover {
                            color: #F1C40F;
                        }
                        .hero-body {
                            background-image: url('https://images.unsplash.com/photo-1569428034239-f9565e32e224?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2958&q=80');
                            background-size: cover;
                            background-position: center;
                            color: #196F3D;
                        }
                        .container {
                            background-color: rgba(255, 255, 255, 0.8);
                            padding: 20px;
                            border-radius: 15px;
                            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
                        }
                    `}
                </style>
            </head>
            <body>
                <section className="hero is-fullheight">
                    <div className="hero-head">
                        <nav className="navbar">
                            <div className="container">
                                <div id="navbarMenuHeroA" className="navbar-menu">
                                    <div className="navbar-start">
                                        <a href="/tasks" className="navbar-item">Tasks</a>
                                        <a href="/profile" className="navbar-item">Profile</a>
                                    </div>
                                    <div className="navbar-end">
                                        <a href="/logout" className="navbar-item">Logout</a>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="hero-body">
                        <div className="container has-text-centered">
                            {children}
                        </div>
                    </div>
                </section>
            </body>
        </div>
    );
}

export default Layout;
