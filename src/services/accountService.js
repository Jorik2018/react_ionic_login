export const accountService = {
	setUserValue,
	getUserValue,
	logout
    /*login,
    
    refreshToken,
    register,
    verifyEmail,
    forgotPassword,
    validateResetToken,
    resetPassword,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value }*/
};

function setUserValue(user){
	user.jwtToken=user.token;
	localStorage.setItem('user',JSON.stringify(user));
}
function logout(){
	localStorage.removeItem('user');
	window.location.reload();
}
function getUserValue(){
	return JSON.parse(localStorage.getItem('user'));
}