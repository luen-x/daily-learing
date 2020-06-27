/**
 * 首先搞清楚三个概念 constructor，__proto__,prototype
 * 对象才会有constructor和__proto__
 * 函数才会有prototype
 * 由于函数也是对象，所以函数也有constructor和__proto__
 * constructor是一个函数（构造函数）
 * __proto__是一个对象，这就是对象的原型（我们暂时称他为对象原型）
 * prototype也是一个对象，函数原型类型，实际上他就是上面的__protot__
 * function AA(){}
 * let a = new AA()
 * 此时AA.prototype === a.__proto__
 *
 * 结论1:函数的prototype===对象的__proto__，构造函数的prototype等于其实例的__proto__
 * 倒过来说，实例的__proto__等于构造函数的prototype
 *
 *
 *
 * 因为函数也是对象 AA也有constructor ,AA.constructor === Function
 *
 * 结论2: 函数的构造函数===Function
 * 那么Function也是对象，Function的构造函数是什么呢？结论3:Function.constructor===Function,Function的构造函数是Function本身
 *
 * AA.__proto__又是什么呢，把AA看作一个对象，AA的构造函数是Function，根据结论1得AA.__proto__==Function.prototype
 * Function.prototype的prototype又是啥？是一个函数实例,是一个空的函数
 *
 * 接下来看实例 a
 * 由结论1可得：a.__proto__===AA.prototype
 * a不是函数，没有prototype
 * a.constructor === AA
 * a.__proto__.constructor === AA
 *
 * 如果存在继承会怎样呢
 * class A{}
 * class B extends A {}
 * let b = new B()
 * 根据结论1得： b.__proto__===B.prototype
 * 测试发现 b.__proto__.__proto__=A.prototype
 * 继承得本质是原型链得继承
 *
 * 当我们去取b得属性x时，先从b得本身取x，如果没有这个x属性则去他的原型__proto__去找x属性，如果__proto__里也没有，则去__proto__.__proto__找x，直到找到或者__proto__是null则返回undefined
 * b.__proto__.__proto__.__proto__ 这样的结构就是我们说的原型链
 * 所以Object的很多api都有ownProperty的单词，意思就是这个对象自己的属性而不是原型链上的属性,比如 Object.getOwnPropertyNames,就是获取对象自己的属性名而不是原型上的属性
 *
 * 使用class继承class然后new出来的对象，会在构造函数中执行自己的原型的构造函数，也就是说执行了多次的constructor来构造最外层的this，相当于所有的构造函数都作用于最外层子类的this上子类的实例会获得真正的自己的属性，
 * 但是方法依然是从原型链上去找方法
 *
 * 说了这么多，这个原型链最好用的地方就是可以给某个函数的原型增加一个方法，或者属性，那么用这个函数作为构造函数生成的对象的原型__proto__都指向这个函数的prototype，因此他们也都可以访问添加的原型上的属性或方法
 * 这就是Vue.prototype.$message = Message这样的写法的作用了
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
