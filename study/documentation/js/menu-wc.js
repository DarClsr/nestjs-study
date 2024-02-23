'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">study documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AaaModule.html" data-type="entity-link" >AaaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AaaModule-4e95124f02c42989deab23e0dfb281ff02ac5b5b136b3ae22b6391393f25e567a2b218765cc30af23115eede55ad9d88de6afa140b52c1eb52521d9b7e12685a"' : 'data-bs-target="#xs-controllers-links-module-AaaModule-4e95124f02c42989deab23e0dfb281ff02ac5b5b136b3ae22b6391393f25e567a2b218765cc30af23115eede55ad9d88de6afa140b52c1eb52521d9b7e12685a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AaaModule-4e95124f02c42989deab23e0dfb281ff02ac5b5b136b3ae22b6391393f25e567a2b218765cc30af23115eede55ad9d88de6afa140b52c1eb52521d9b7e12685a"' :
                                            'id="xs-controllers-links-module-AaaModule-4e95124f02c42989deab23e0dfb281ff02ac5b5b136b3ae22b6391393f25e567a2b218765cc30af23115eede55ad9d88de6afa140b52c1eb52521d9b7e12685a"' }>
                                            <li class="link">
                                                <a href="controllers/AaaController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AaaController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AaaModule-4e95124f02c42989deab23e0dfb281ff02ac5b5b136b3ae22b6391393f25e567a2b218765cc30af23115eede55ad9d88de6afa140b52c1eb52521d9b7e12685a"' : 'data-bs-target="#xs-injectables-links-module-AaaModule-4e95124f02c42989deab23e0dfb281ff02ac5b5b136b3ae22b6391393f25e567a2b218765cc30af23115eede55ad9d88de6afa140b52c1eb52521d9b7e12685a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AaaModule-4e95124f02c42989deab23e0dfb281ff02ac5b5b136b3ae22b6391393f25e567a2b218765cc30af23115eede55ad9d88de6afa140b52c1eb52521d9b7e12685a"' :
                                        'id="xs-injectables-links-module-AaaModule-4e95124f02c42989deab23e0dfb281ff02ac5b5b136b3ae22b6391393f25e567a2b218765cc30af23115eede55ad9d88de6afa140b52c1eb52521d9b7e12685a"' }>
                                        <li class="link">
                                            <a href="injectables/AaaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AaaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-b24fac16b3f63d21fc8769b14a088b0b52d265d5869423ad79fae8422a9d3ea137c55750a76c1c161f3b129bd2ea941891aa58ff41134281d371b4c743d92f6e"' : 'data-bs-target="#xs-controllers-links-module-AppModule-b24fac16b3f63d21fc8769b14a088b0b52d265d5869423ad79fae8422a9d3ea137c55750a76c1c161f3b129bd2ea941891aa58ff41134281d371b4c743d92f6e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-b24fac16b3f63d21fc8769b14a088b0b52d265d5869423ad79fae8422a9d3ea137c55750a76c1c161f3b129bd2ea941891aa58ff41134281d371b4c743d92f6e"' :
                                            'id="xs-controllers-links-module-AppModule-b24fac16b3f63d21fc8769b14a088b0b52d265d5869423ad79fae8422a9d3ea137c55750a76c1c161f3b129bd2ea941891aa58ff41134281d371b4c743d92f6e"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-b24fac16b3f63d21fc8769b14a088b0b52d265d5869423ad79fae8422a9d3ea137c55750a76c1c161f3b129bd2ea941891aa58ff41134281d371b4c743d92f6e"' : 'data-bs-target="#xs-injectables-links-module-AppModule-b24fac16b3f63d21fc8769b14a088b0b52d265d5869423ad79fae8422a9d3ea137c55750a76c1c161f3b129bd2ea941891aa58ff41134281d371b4c743d92f6e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-b24fac16b3f63d21fc8769b14a088b0b52d265d5869423ad79fae8422a9d3ea137c55750a76c1c161f3b129bd2ea941891aa58ff41134281d371b4c743d92f6e"' :
                                        'id="xs-injectables-links-module-AppModule-b24fac16b3f63d21fc8769b14a088b0b52d265d5869423ad79fae8422a9d3ea137c55750a76c1c161f3b129bd2ea941891aa58ff41134281d371b4c743d92f6e"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BbbModule.html" data-type="entity-link" >BbbModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BbbModule-68acf2f1cfd1632421b8e78db725d7483e1013dcd10cb6a82ad27557ca45dbab9945cedab2e85e0de45b7208b449bba94614974c2220124368d81f6081780382"' : 'data-bs-target="#xs-controllers-links-module-BbbModule-68acf2f1cfd1632421b8e78db725d7483e1013dcd10cb6a82ad27557ca45dbab9945cedab2e85e0de45b7208b449bba94614974c2220124368d81f6081780382"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BbbModule-68acf2f1cfd1632421b8e78db725d7483e1013dcd10cb6a82ad27557ca45dbab9945cedab2e85e0de45b7208b449bba94614974c2220124368d81f6081780382"' :
                                            'id="xs-controllers-links-module-BbbModule-68acf2f1cfd1632421b8e78db725d7483e1013dcd10cb6a82ad27557ca45dbab9945cedab2e85e0de45b7208b449bba94614974c2220124368d81f6081780382"' }>
                                            <li class="link">
                                                <a href="controllers/BbbController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BbbController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BbbModule-68acf2f1cfd1632421b8e78db725d7483e1013dcd10cb6a82ad27557ca45dbab9945cedab2e85e0de45b7208b449bba94614974c2220124368d81f6081780382"' : 'data-bs-target="#xs-injectables-links-module-BbbModule-68acf2f1cfd1632421b8e78db725d7483e1013dcd10cb6a82ad27557ca45dbab9945cedab2e85e0de45b7208b449bba94614974c2220124368d81f6081780382"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BbbModule-68acf2f1cfd1632421b8e78db725d7483e1013dcd10cb6a82ad27557ca45dbab9945cedab2e85e0de45b7208b449bba94614974c2220124368d81f6081780382"' :
                                        'id="xs-injectables-links-module-BbbModule-68acf2f1cfd1632421b8e78db725d7483e1013dcd10cb6a82ad27557ca45dbab9945cedab2e85e0de45b7208b449bba94614974c2220124368d81f6081780382"' }>
                                        <li class="link">
                                            <a href="injectables/BbbService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BbbService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MapModule.html" data-type="entity-link" >MapModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MapModule-d8e36183ff0360a5dd695b6a791a979995276fa92d1adf74e0a3d2c4ec4ef04db4b8281375b1ffab061ee69da6e6b3f78bb2449d26c34297bc5d01f53df3a3cb"' : 'data-bs-target="#xs-controllers-links-module-MapModule-d8e36183ff0360a5dd695b6a791a979995276fa92d1adf74e0a3d2c4ec4ef04db4b8281375b1ffab061ee69da6e6b3f78bb2449d26c34297bc5d01f53df3a3cb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MapModule-d8e36183ff0360a5dd695b6a791a979995276fa92d1adf74e0a3d2c4ec4ef04db4b8281375b1ffab061ee69da6e6b3f78bb2449d26c34297bc5d01f53df3a3cb"' :
                                            'id="xs-controllers-links-module-MapModule-d8e36183ff0360a5dd695b6a791a979995276fa92d1adf74e0a3d2c4ec4ef04db4b8281375b1ffab061ee69da6e6b3f78bb2449d26c34297bc5d01f53df3a3cb"' }>
                                            <li class="link">
                                                <a href="controllers/MapController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MapController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MapModule-d8e36183ff0360a5dd695b6a791a979995276fa92d1adf74e0a3d2c4ec4ef04db4b8281375b1ffab061ee69da6e6b3f78bb2449d26c34297bc5d01f53df3a3cb"' : 'data-bs-target="#xs-injectables-links-module-MapModule-d8e36183ff0360a5dd695b6a791a979995276fa92d1adf74e0a3d2c4ec4ef04db4b8281375b1ffab061ee69da6e6b3f78bb2449d26c34297bc5d01f53df3a3cb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MapModule-d8e36183ff0360a5dd695b6a791a979995276fa92d1adf74e0a3d2c4ec4ef04db4b8281375b1ffab061ee69da6e6b3f78bb2449d26c34297bc5d01f53df3a3cb"' :
                                        'id="xs-injectables-links-module-MapModule-d8e36183ff0360a5dd695b6a791a979995276fa92d1adf74e0a3d2c4ec4ef04db4b8281375b1ffab061ee69da6e6b3f78bb2449d26c34297bc5d01f53df3a3cb"' }>
                                        <li class="link">
                                            <a href="injectables/MapService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MapService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PersonModule.html" data-type="entity-link" >PersonModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PersonModule-b92e36fc3bfe6ff45875e5385cf45e2564f6e5c42662a7d77d62041f61dfe970604061427818bab8fb6824809449901e01460d80431532cecfe004477bfbdbe9"' : 'data-bs-target="#xs-controllers-links-module-PersonModule-b92e36fc3bfe6ff45875e5385cf45e2564f6e5c42662a7d77d62041f61dfe970604061427818bab8fb6824809449901e01460d80431532cecfe004477bfbdbe9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PersonModule-b92e36fc3bfe6ff45875e5385cf45e2564f6e5c42662a7d77d62041f61dfe970604061427818bab8fb6824809449901e01460d80431532cecfe004477bfbdbe9"' :
                                            'id="xs-controllers-links-module-PersonModule-b92e36fc3bfe6ff45875e5385cf45e2564f6e5c42662a7d77d62041f61dfe970604061427818bab8fb6824809449901e01460d80431532cecfe004477bfbdbe9"' }>
                                            <li class="link">
                                                <a href="controllers/PersonController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersonController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PersonModule-b92e36fc3bfe6ff45875e5385cf45e2564f6e5c42662a7d77d62041f61dfe970604061427818bab8fb6824809449901e01460d80431532cecfe004477bfbdbe9"' : 'data-bs-target="#xs-injectables-links-module-PersonModule-b92e36fc3bfe6ff45875e5385cf45e2564f6e5c42662a7d77d62041f61dfe970604061427818bab8fb6824809449901e01460d80431532cecfe004477bfbdbe9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PersonModule-b92e36fc3bfe6ff45875e5385cf45e2564f6e5c42662a7d77d62041f61dfe970604061427818bab8fb6824809449901e01460d80431532cecfe004477bfbdbe9"' :
                                        'id="xs-injectables-links-module-PersonModule-b92e36fc3bfe6ff45875e5385cf45e2564f6e5c42662a7d77d62041f61dfe970604061427818bab8fb6824809449901e01460d80431532cecfe004477bfbdbe9"' }>
                                        <li class="link">
                                            <a href="injectables/PersonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersonService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RedisModule.html" data-type="entity-link" >RedisModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RedisModule-d2605e7d8616b599642ab90f7fe86ca631a7b5c5e6fa56f59860d68bf58b75707fa9de0ec54e3f574e6648c540ca8b48bc370ee0029f1a081ca28c3f1ceee76d"' : 'data-bs-target="#xs-injectables-links-module-RedisModule-d2605e7d8616b599642ab90f7fe86ca631a7b5c5e6fa56f59860d68bf58b75707fa9de0ec54e3f574e6648c540ca8b48bc370ee0029f1a081ca28c3f1ceee76d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RedisModule-d2605e7d8616b599642ab90f7fe86ca631a7b5c5e6fa56f59860d68bf58b75707fa9de0ec54e3f574e6648c540ca8b48bc370ee0029f1a081ca28c3f1ceee76d"' :
                                        'id="xs-injectables-links-module-RedisModule-d2605e7d8616b599642ab90f7fe86ca631a7b5c5e6fa56f59860d68bf58b75707fa9de0ec54e3f574e6648c540ca8b48bc370ee0029f1a081ca28c3f1ceee76d"' }>
                                        <li class="link">
                                            <a href="injectables/RedisService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RedisService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-6df0d393397a8bfcfd3eecb2f4555d1b7f35a9ae819d44c4e0edcd17af23154e659245fbeed3237da291487ccf3bb22ac728cd7b39fdc0af2259a4893cabbad1"' : 'data-bs-target="#xs-controllers-links-module-UserModule-6df0d393397a8bfcfd3eecb2f4555d1b7f35a9ae819d44c4e0edcd17af23154e659245fbeed3237da291487ccf3bb22ac728cd7b39fdc0af2259a4893cabbad1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-6df0d393397a8bfcfd3eecb2f4555d1b7f35a9ae819d44c4e0edcd17af23154e659245fbeed3237da291487ccf3bb22ac728cd7b39fdc0af2259a4893cabbad1"' :
                                            'id="xs-controllers-links-module-UserModule-6df0d393397a8bfcfd3eecb2f4555d1b7f35a9ae819d44c4e0edcd17af23154e659245fbeed3237da291487ccf3bb22ac728cd7b39fdc0af2259a4893cabbad1"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-6df0d393397a8bfcfd3eecb2f4555d1b7f35a9ae819d44c4e0edcd17af23154e659245fbeed3237da291487ccf3bb22ac728cd7b39fdc0af2259a4893cabbad1"' : 'data-bs-target="#xs-injectables-links-module-UserModule-6df0d393397a8bfcfd3eecb2f4555d1b7f35a9ae819d44c4e0edcd17af23154e659245fbeed3237da291487ccf3bb22ac728cd7b39fdc0af2259a4893cabbad1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-6df0d393397a8bfcfd3eecb2f4555d1b7f35a9ae819d44c4e0edcd17af23154e659245fbeed3237da291487ccf3bb22ac728cd7b39fdc0af2259a4893cabbad1"' :
                                        'id="xs-injectables-links-module-UserModule-6df0d393397a8bfcfd3eecb2f4555d1b7f35a9ae819d44c4e0edcd17af23154e659245fbeed3237da291487ccf3bb22ac728cd7b39fdc0af2259a4893cabbad1"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WinstonModule.html" data-type="entity-link" >WinstonModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AaaController.html" data-type="entity-link" >AaaController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/BbbController.html" data-type="entity-link" >BbbController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MapController.html" data-type="entity-link" >MapController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PersonController.html" data-type="entity-link" >PersonController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Permission.html" data-type="entity-link" >Permission</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Role.html" data-type="entity-link" >Role</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Aaa.html" data-type="entity-link" >Aaa</a>
                            </li>
                            <li class="link">
                                <a href="classes/Bbb.html" data-type="entity-link" >Bbb</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAaaDto.html" data-type="entity-link" >CreateAaaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBbbDto.html" data-type="entity-link" >CreateBbbDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePersonDto.html" data-type="entity-link" >CreatePersonDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MyLogger.html" data-type="entity-link" >MyLogger</a>
                            </li>
                            <li class="link">
                                <a href="classes/Person.html" data-type="entity-link" >Person</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAaaDto.html" data-type="entity-link" >UpdateAaaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBbbDto.html" data-type="entity-link" >UpdateBbbDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePersonDto.html" data-type="entity-link" >UpdatePersonDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AaaService.html" data-type="entity-link" >AaaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BbbService.html" data-type="entity-link" >BbbService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogMiddleware.html" data-type="entity-link" >LogMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MapService.html" data-type="entity-link" >MapService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PersonService.html" data-type="entity-link" >PersonService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QuerypageInterceptor.html" data-type="entity-link" >QuerypageInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RedisService.html" data-type="entity-link" >RedisService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidatePipe.html" data-type="entity-link" >ValidatePipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AaaGuard.html" data-type="entity-link" >AaaGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/LoginGuard.html" data-type="entity-link" >LoginGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/LoginGuard-1.html" data-type="entity-link" >LoginGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/PermissionGuard.html" data-type="entity-link" >PermissionGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/PermissionGuard-1.html" data-type="entity-link" >PermissionGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Request.html" data-type="entity-link" >Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Session.html" data-type="entity-link" >Session</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Session-1.html" data-type="entity-link" >Session</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise-inverted.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});