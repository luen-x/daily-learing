// vue是如何检测数组变化的
// 由于 JavaScript 的限制，Vue 无法检测到以下数组变动
// 1、当你使用索引直接设置一项时，例如 vm.items[indexOfItem] = newValue
// 2、当你修改数组长度时，例如 vm.items.length = newLength
// 基于Object。defineProperty无法做到监控以上行为
// vue为了解决这一问题，修改了在data中定义的数组的原型方法，对于数组的操作
// 'push',
//   'pop',
//   'shift',
//   'unshift',
//   'splice',
//   'sort',
//   'reverse'
// 都进行了一次包装，使得我们在执行数组操作的时候会触发视图的渲染
// 如果用Proxy可以这么实现
const data = { arr: [] }
const apis = [
	'push',
	'pop',
	'shift',
	'unshift',
	'splice',
	'sort',
	'reverse'
]
Object.keys(data).forEach(key => {
	if (Array.isArray(data[key])) {
		data[key] = new Proxy(data[key], {
			get(target, prop) {
				if (apis.includes(prop)) {
					return function (...rest) {
						console.log(target,prop)
						target[prop](...rest);
						console.log('render')// 触发渲染
					}

				}else{
					return target[prop]
				}

			}
		})
	}
})
data.arr.push(1)

data.arr.push(2)
console.log(data.arr)
// 以上就可以实现了，但是数据的类型会由Array变为Proxy

// 使用Object.defineProperty来实现试试
const data = { arr: [] }
const apis = [
	'push',
	'pop',
	'shift',
	'unshift',
	'splice',
	'sort',
	'reverse'
]
Object.keys(data).forEach(key => {
	if (Array.isArray(data[key])) {
		Object.defineProperty(data[key],'push',{
			get(){
				return function (...rest) {
					console.log(target,prop)
					target[prop](...rest);
					console.log('render')// 触发渲染
				}
			}
		})
	
	}
})
data.arr.push(1)

data.arr.push(2)
console.log(data.arr)

