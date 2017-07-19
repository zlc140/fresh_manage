/*
* 存储localStorage
*/
export const setStore = (name,content) => {
	if(!name) return;
	if(typeof content !== 'string') {
		content = JSON.stringify(content)
	}
	// window.sessionStorage.setItem(name,content)
	window.localStorage.setItem(name,content)

}

/*
* 获取localStorage
*/
export const getStore = name => {
	if(!name) return;
	let userInfo = JSON.parse(window.localStorage.getItem(name));
	return userInfo;

}

/*
* 删除localStorage
*/
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}
