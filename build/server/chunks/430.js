"use strict";
exports.id = 430;
exports.ids = [430];
exports.modules = {

/***/ 430:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ HomePageNewsService)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9830);


class HomePageNewsService {
    async getAll() {
        try {
            console.log(_utils_constants__WEBPACK_IMPORTED_MODULE_1__/* .SERVER_BASE_URL */ .S, 'base url');
            const response = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`${_utils_constants__WEBPACK_IMPORTED_MODULE_1__/* .SERVER_BASE_URL */ .S}/home-page/news/`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data.allTopNews;
        } catch (error) {
            throw error.response.data.message;
        }
    }
    async create(data) {
        try {
            const token = JSON.parse(localStorage.getItem('user')).token;
            const body = JSON.stringify({
                news: data
            });
            const response = await axios__WEBPACK_IMPORTED_MODULE_0___default().post(`${_utils_constants__WEBPACK_IMPORTED_MODULE_1__/* .SERVER_BASE_URL */ .S}/home-page/news/`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`
                }
            });
            return response.data.topNews;
        } catch (error) {
            throw error.response.data.message;
        }
    }
    async deleteById(id) {
        try {
            const token = JSON.parse(localStorage.getItem('user')).token;
            const response = await axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"](`${_utils_constants__WEBPACK_IMPORTED_MODULE_1__/* .SERVER_BASE_URL */ .S}/home-page/news/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    }
}



/***/ })

};
;