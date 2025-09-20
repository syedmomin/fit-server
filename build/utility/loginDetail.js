"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = makeLoginDetail;
// utils.js
function makeLoginDetail(user, company) {
    return {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        companyId: company.id,
        website: company.website,
        address1: company.address1,
        address2: company.address2,
        token: user.token,
    };
}
