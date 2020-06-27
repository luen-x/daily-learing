// Object.defineProperty

// Object.defineProperty() 重新定义目标对象的某个属性的行为，包括该属性的value，get，set，configurable，writable，enumerable并返回此对象。
// Object.defineProperty(obj, prop, descriptor)
// obj是目标对象，prop是目标对象的属性名，

//修改value
let a={x:1}
function setValue (obj,prop,value){
	Object.defineProperty(obj,prop,{value})

}
// setValue(a,'x',2)
// console.log(a) // print: { x: 2 }

// 修改getter
function setGetter(obj,prop,get){
	Object.defineProperty(obj,prop,{get})
}
setGetter(a,'x',function(){console.log('get',this);return 'x'})
console.log(a.x) // 打印出了对象a和x，说明是可以访问this的


function setSetter(obj,prop,set){
	Object.defineProperty(obj,prop,{set})
}
// setSetter(a,'x',function(value){this.x=value+1}) // 会造成死循环，在setter里面进行赋值又会导致setter的调用

// setSetter(a,'x',function(value){this.y=value+1}) 
// a.x=2;
// console.log(a.x)
// console.log(a.y)
// // 惊奇发现！打印出了undefined和3，每次defineProperty，没有写的属性配置也会被重置吗，再试一次
// setGetter(a,'x',function(){return 1}) 
// a.x=3;
// console.log(a.x)
// console.log(a.y) // 然而并没有重置，推测setter会取返回值对原值赋值
// setSetter(a,'x',function(value){this.y=value+1;return value+2}) 
// a.x=2;
// console.log(a.x)// 依然没用，还是undefined，看来是必须同时设置getter，setter
// console.log(a.y)
a={x:1}
Object.defineProperty(a,'x',{
	get(){
		console.log('get exe')
		return this._a;
	},
	set(value){
		console.log('set exe')
		this._a=value
	}	
})
a.x=10;
console.log(a) // 确实如此

// enumerable 定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举。
a={x:1}
for(let key in a){
	console.log(key)
}

Object.defineProperty(a,'x',{enumerable:false});
console.log(Object.keys(a)) // [] 确实遍历不到了
for(let key in a){
	console.log(key)
}

// configurable 当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。
a={x:1}
Object.defineProperty(a,'x',{configurable:false});
Object.defineProperty(a,'x',{value:100})
console.log(a) // 依然修改成功了，难道所谓的属性描述符不包含value？
// Object.defineProperty(a,'x',{get(){return 100}}) // 报错 Cannot redefine property

// Object.defineProperty(a,'x',{set(){return 100}}) // 报错 Cannot redefine property
// Object.defineProperty(a,'x',{enumerable:false}) // 报错 Cannot redefine property
// Object.defineProperty(a,'x',{configurable:true}) // 报错 Cannot redefine property
// 一旦设置了configurable为false，那么没办法再设置configurable为true了
Object.defineProperty(a,'x',{writable:false}) // writable设置为false成功

Object.defineProperty(a,'x',{writable:true}) // 如果已经是false则不能再被改为false
// 综上所属，configurable被设置为false后，除了value和writeable可以修改，其他的修改都会直接报错

// writable 当且仅当该属性的 writable 键值为 true 时，属性的值，也就是上面的 value，才能被
a.x=0
console.log(a.x) // 没有抛出异常，静默地修改失败了，依然打印了原值
let a={x:1};
Object.defineProperty(a,'x',{writable:false})
Object.defineProperty(a,'x',{value:2}) // 即使设置了writable为false，依然可以使用Object.defineProperty来设置值
console.log(a)
a.x=3
console.log(a)

a={x:1}
// Object.defineProperty(a,'x',{set:function(){console.log(x)}})
// Object.defineProperty(a,'x',{value:2}) // Object.defineProperty来设置对象的值不会触发setter
// 所以我们可以这样做来避免死循环,
Object.defineProperty(a,'x',{set:function(value){console.log('x = '+value);Object.defineProperty(this,'x',{value})}})
a.x=2
console.log(a)
// 描述符同时拥有 （value 或 writable） 和 （get 或 set 键），则会产生一个异常。
// 对原型链的影响
function A(){
	this.x=1;
	return this;
}
A.prototype={c:3}
const a=new A()
console.log(a.c)
Object.defineProperty(a,'c',{value:4})
console.log(a.c)
console.log(A.prototype)



/**
 * 总结：
 * Object.defineProperty可以劫持对象属性的访问，以数据描述符的方式来控制对属性的访问
 * 	可配置的项有：
 * 	configurable：该属性如果为false，则该对象的get，set，enumerable，configurable不能再被修改，也不能使用delete而writable如果是true则可以改为false，如果是false则不能改为true
 * 	enumerable：控制该属性是否可以通过for in 或 Object.keys访问到，
 * 	writable： 控制该属性是否可以重新被赋新值
 *  get：取值时会触发get函数并返回其返回值，注意在get函数中进行再取值会导致死循环，函数的this指向当前属性所在的对象，
 * 	set：赋值时会触发set函数传入被赋的值为参数，注意在set函数中进行再赋值值会导致死循环，函数的this指向当前属性所在的对象，但是可以在set函数中使用Object.defineProperty来修改value，不会触发set
 * 	value: 给该属性赋值，如果configurable为false也不会影响赋值功能，只有writable为false才会导致Object.defineProperty设置value失败，使用此方法设置value不会触发set方法
 * 	Object.defineProperty只会对当前对象的属性进行拦截，而不会修改原型链上的访问
 * 	如果对一个构造函数的原型使用Object.defineProperty，那么这会影响所有该构造函数创建的实例
 * 
 */

























