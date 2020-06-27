// Proxy学习
// Proxy是es6提供的新方法，可以更加方便地拦截对象属性的读和写
// 构造一个Proxy  let a= new Proxy(target,handler)
// target是目标对象，handler定义了要如何拦截对象属性的访问

let a = new Proxy({a:1},{get(){return '2'}})
console.log(a.a) // 获得2
const x= {a:1}
let b = new Proxy(x,{get(){return '2'}})
console.log(x===b) // false，返回的一个Proxy实例而不是原对象

 // handler提供了大量的捕获器来劫持对象的各种操作，其功能要比Object.defineProperty要多的多
 // 所有的捕捉器是可选的。如果没有定义某个捕捉器，那么就会保留源对象的默认行为

 // 各类捕获器尝试
 // get
 let a = new Proxy({a:1},{
	 get(target,prop){
		 console.log('get exe')
		 return target[prop]+1
		}

	})
console.log(a.a)// 打印了get exe // 可以看到，使用proxy可以解决Object.defineProperty的取值死循环问题

// set
let a = new Proxy({a:1},{
	set(target,prop,value){
		return target[prop] = value+1
	   }

   })
a.a+=1
console.log(a) // 得到{ a: 3 }
// delete
let a = new Proxy({a:1},{
	deleteProperty(target,prop){
		console.log('deleted')
		return delete target[prop]
	   }

   })
delete a.a
// 还有很多api·····
