"use strict";
exports.id = 498;
exports.ids = [498];
exports.modules = {

/***/ 8498:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ UserService)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9830);


class UserService {
    async login(loginData) {
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_0___default().post(`${_utils_constants__WEBPACK_IMPORTED_MODULE_1__/* .SERVER_BASE_URL */ .S}/users/login`, JSON.stringify({
                user: loginData
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return response.data.user;
        } catch (error) {
            throw error.response.data;
        }
    }
    async register(loginData) {
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_0___default().post(`${_utils_constants__WEBPACK_IMPORTED_MODULE_1__/* .SERVER_BASE_URL */ .S}/users`, JSON.stringify({
                user: loginData
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return response.data.user;
        } catch (error) {
            throw error.response.data;
        }
    }
}



/***/ })

};
;