import './base.css'
import './index.scss'
import {a} from './util'

console.log('util.a run')
a()

const arr = []
console.log(_isArray(arr))

var app = document.getElementById("app");
var div = document.createElement("div");
div.className = "box";
app.appendChild(div);
