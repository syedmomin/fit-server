// utils.js
export default function makeLoginDetail(user: any, company: any) {
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
