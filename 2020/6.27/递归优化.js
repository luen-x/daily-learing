// 递归累加
// function F(n, end = 0) {
// 	end += n;
// 	if (n == 1) return end;
// 	return end + F(n - 1);
// }
// console.log(F(30000))

// 循环累加
// function F(n){
// 	let end=0;
// 	while (n>=1){
// 		end+=n;
// 		n--
// 	}
// 	return end
// }
// console.log(F(10000));
// 递归累加在次数超过10000次时超出调用栈最大深度，循环累加则不会有问题，并且性能更高

// 树结构遍历，递归转为while循环

// 递归树结构
const tree = [{ name: 'a', children: [{ name: 'b', children: [{ name: 'd' }] }, { name: 'c' }] }];

// function treeForEach(tree,fn){
// 	tree.forEach(item=>{
// 		fn(item);
// 		if(item.children && item.children.length){
// 			treeForEach(item.children,fn)
// 		}
// 	})
// }
// 循环遍历树结构

function treeForEach(tree_) {
	const all = [];
	const stack = [...tree_];
	let t = stack.pop();
	while (t) {
		all.push(t);
		if (t.children && t.children.length) {
			stack.push(...t.children);
		}
		t = stack.pop();
	}
	return all;
}
console.log(treeForEach(tree));
/**
 * 总结：递归
 * 优点：实现简单，代码可读性强
 * 缺点：层次太深可能会造成栈内存溢出，node中报错为超过最大调用深度，递归的性能不如循环
 * 如果遇到超过1000深度的递归则需要考虑转为while循环，防止出现栈内存溢出。
 *
 * 以上两种思路基本上可以解决大部分递归到循环的转换
 *
 * js引擎没有做尾递归优化
 */
