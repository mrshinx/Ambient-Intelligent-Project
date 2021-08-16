function include(filename) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = filename;
    script.type = 'text/javascript';
    head.appendChild(script);
}
function rand(min, max) {
    if (min > max) {
        var tmp = max;
        max = min;
        min = tmp;
    }
    if (min == max)
        return min;
    return (min + Math.random() * (max - min));
}
function rand_int(min, max) {
    return Math.round(rand(min, max));
}
function randperm(n) {
    var v = [];
    for (var i = 0; i < n; i++)
        v.push(i);
    v = shuffle(v);
    return v;
}
function shuffle(m) {
    var n = m.length;
    for (var i = 0; i < n; i++) {
        var p = rand_int(0, n - 1);
        var tmp = m[i];
        m[i] = m[p];
        m[p] = tmp;
    }
    return m;
}
;
function erase(ary, idx) {
    var tmp = [];
    for (var i = 0; i < ary.length; i++) {
        if (i != idx) {
            tmp.push(ary[i]);
        }
    }
    return tmp;
}
function erase_value(ary, val) {
    var tmp = [];
    for (var i = 0; i < ary.length; i++) {
        if (ary[i] != val) {
            tmp.push(ary[i]);
        }
    }
    return tmp;
}
function matrix2str(matrix) {
    var rows = matrix.length;
    var cols = matrix[0].length;
    var str_data = "matrix ";
    str_data = str_data + rows.toString() + " ";
    str_data = str_data + cols.toString() + " ";
    str_data = str_data + "0 ";
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            str_data = str_data + matrix[i][j].toString() + " ";
        }
    }
    return str_data;
}
function str2matrix(matrix_str) {
    var matrix = [];
    var s = matrix_str.split(" ");
    var k = 0;
    if (s[k++] != "matrix") {
        return null;
    }
    var rows = parseInt(s[k++]);
    var cols = parseInt(s[k++]);
    if (rows == 0 && cols == 0) {
        return [];
    }
    var order = parseInt(s[k++]);
    matrix = new Array(rows);
    for (var i = 0; i < rows; i++) {
        matrix[i] = new Array(cols);
        for (var j = 0; j < cols; j++) {
            matrix[i][j] = parseFloat(s[k++]);
            if (k > s.length)
                return null;
        }
    }
    return matrix;
}

function round_rect(cx, x, y, width, height, radius, fill, stroke)
{
    if (typeof stroke == "undefined") {
        stroke = true;
    }
    if (typeof radius === "undefined") {
        radius = 5;
    }
    cx.beginPath();
    cx.moveTo(x + radius, y);
    cx.lineTo(x + width - radius, y);
    cx.quadraticCurveTo(x + width, y, x + width, y + radius);
    cx.lineTo(x + width, y + height - radius);
    cx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    cx.lineTo(x + radius, y + height);
    cx.quadraticCurveTo(x, y + height, x, y + height - radius);
    cx.lineTo(x, y + radius);
    cx.quadraticCurveTo(x, y, x + radius, y);
    cx.closePath();
    if (stroke) {
        cx.stroke();
    }
    if (fill) {
        cx.fill();
    }
}
function circle(cx, x, y, radius, fill, stroke) {
    if (typeof stroke == "undefined") {
        stroke = true;
    }
    cx.beginPath();
    cx.arc(x, y, radius, 0, 2 * Math.PI, false);
    if (fill) {
        cx.fill();
    }
    if (stroke) {
        cx.stroke();
    }
    cx.closePath();
}
function line(cx, x1, y1, x2, y2) {
    cx.beginPath();
    cx.moveTo(x1, y1);
    cx.lineTo(x2, y2);
    cx.closePath();
    cx.stroke();
}
function arrow(cx, w, h) {
    cx.beginPath();
    cx.lineTo(0, 0.5 * h);
    cx.lineTo(0.7 * w, 0.5 * h);
    cx.lineTo(0.7 * w, h);
    cx.lineTo(w, 0);
    cx.lineTo(0.7 * w, -h);
    cx.lineTo(0.7 * w, -0.5 * h);
    cx.lineTo(0, -0.5 * h);
    cx.lineTo(0, 0);
    cx.closePath();
}
function draw_arrow(x, y, w, h, angle, color) {
    cx.save();
    cx.translate(x, y);
    cx.rotate(angle * Math.PI / 180);
    cx.fillStyle = color;
    arrow(cx, w, h);
    cx.fill();
    cx.restore();
}
function button(cx, e, x, y, w, h, label) {
    cx.fillStyle = "rgba(0, 0, 0, 0.2)";
    round_rect(cx, x + 4, y + 4, w, h, 0.2 * h, true, false);
    var o = 0;
    var inside = e.mx >= x && e.mx <= x + w && e.my >= y && e.my <= y + h;
    if (inside) {
        if (e.mouse_down) {
            o = 4;
        }
        if (e.mouse_klicked) {
            e.mouse_klicked = false;
            return true;
        }
    }
    if (inside)
        cx.fillStyle = "rgb(240,255,240)";
    else
        cx.fillStyle = "white";
    round_rect(cx, x + o, y + o, w, h, 0.2 * h, true, true);
    cx.fillStyle = "black";
    cx.textAlign = "center";
    cx.fillText(label, x + 0.5 * w + o, y + 0.5 * h + o + 4);
    return false;
}

// flag is the variable to be toggled
function toggle_button(cx, e, flag, x, y, w, h, label)
{
    
    // transparent button shadow
    cx.fillStyle = "rgba(0, 0, 0, 0.2)";
    round_rect(cx, x + 4, y + 4, w, h, 0.2 * h, true, false);
    
    var o = 0; // offset for press-down effect
    var inside = e.mx >= x && e.mx <= x + w && e.my >= y && e.my <= y + h;
    if (inside) {
        if (e.mouse_down) {
            o = 0;//4;
        }
        if (e.mouse_klicked) {
            e.mouse_klicked = false;
            if(flag){flag = false;} else {flag = true; }
            return flag;
        }
    }
    if (inside)
        cx.fillStyle = "rgb(240,255,240)";
    else
        cx.fillStyle = "white";
        
    // button rectangle 
    round_rect(cx, x + o, y + o, w, h, 0.2 * h, true, true);
    
    // visualize flag state
	var r = 0.2 * h;
	var x1 = x + o + 0.05*w;
	var y1 = y + o + 0.5*h-r;    
	cx.fillStyle = "rgb(170, 170, 255)";
    round_rect(cx, x1 , y1, 4*r, 2*r, r, true, true);
	 
	if(flag)
	{
		cx.fillStyle = "rgb(100, 255, 100)";
		circle(cx, x1 + r + 2*r, y1+r, 0.95*r, true, true);
	}
	else
	{
		cx.fillStyle = "rgb(170, 170, 255)";
		circle(cx, x1 + r, y1 + r, 0.95*r, true, true);
	}
    
    cx.fillStyle = "black";
    cx.textAlign = "left";
    cx.fillText(label, x1 + 4.75*r, y + 0.5 * h + o + 4);
	
    return flag;
}

// flag is the variable to be toggled
function slider(cx, e, x, y, w, h, slider_val, slider_min, slider_max, label)
{
    
	if(slider_val>slider_max){ slider_val = slider_max;}
	if(slider_val<slider_min){ slider_val = slider_min;}
  
    // transparent button shadow
    cx.fillStyle = "rgba(0, 0, 0, 0.2)";
    round_rect(cx, x + 4, y + 4, w, h, 0.2 * h, true, false);
  
  
    var inside = e.mx >= x && e.mx <= x + w && e.my >= y && e.my <= y + h;
    /*
	if (inside) {
        if (e.mouse_down) {
            o = 0;//4;
        }
        if (e.mouse_klicked) {
            e.mouse_klicked = false;
            if(flag){flag = false;} else {flag = true; }
            return flag;
        }
    }
	*/
    if (inside)
	{
        cx.fillStyle = "rgb(240,255,240)";
	}
    else
	{
        cx.fillStyle = "white";
	}
        
	// slider box
    round_rect(cx, x, y, w, h, 0.2 * h, true, true);
	
	// slider horizontal line
	var knob_w = 0.3*h; // slider knob width depends on vertical size
	var knob_h = 0.9*h;
	var slider_w = w - knob_w;
	
	line(cx, x + 0.5*knob_w, y + 0.5*h, x + 0.5*knob_w + slider_w, y + 0.5*h);

	// slider text
	cx.fillStyle = "black";
    cx.textAlign = "left";
    cx.fillText(label, x + 0.5*knob_w, y + 15);


	// slider knob
	var knob_y = y + 0.05*h;
	var knob_x = x + slider_w*(slider_val-slider_min) / (slider_max-slider_min);

	var inside_knob = e.mx >= knob_x && e.mx <= knob_x + knob_w && e.my >= knob_y && e.my <= knob_y + knob_h;

	if(inside)
	{
		if(e.mouse_down)
		{
			slider_val = slider_min + (slider_max-slider_min)*(e.mx - (x+0.5*knob_w)) / slider_w;
		}		
	}

    if (inside_knob)
	{
		cx.fillStyle = "rgba(100, 255, 100, 0.5)";
	} 
	else 
		{ cx.fillStyle = "rgba(170, 170, 255, 0.5)";}

    round_rect(cx, knob_x, knob_y, knob_w, knob_h,  0.1*h, true, true);

	// todo drag slider

/*    
    // visualize flag state
	var r = 0.2 * h;
	var x1 = x + o + 0.05*w;
	var y1 = y + o + 0.5*h-r;    
	
    round_rect(cx, x1 , y1, 4*r, 2*r, r, true, true);
	 
	if(flag)
	{
		
		circle(cx, x1 + r + 2*r, y1+r, 0.95*r, true, true);
	}
	else
	{
		cx.fillStyle = "rgb(170, 170, 255)";
		circle(cx, x1 + r, y1 + r, 0.95*r, true, true);
	}
    
    cx.fillStyle = "black";
    cx.textAlign = "left";
    cx.fillText(label, x1 + 4.75*r, y + 0.5 * h + o + 4);
	*/
	
    return slider_val;
}



var Fuse_button = (function () {
    function Fuse_button() {
        this.catch_mouse = false;
        this.fuse_radius = 0;
    }
    Fuse_button.prototype.tick = function (dt) {
        if (this.catch_mouse) {
            this.fuse_radius += 20 * dt;
        }
    };
    Fuse_button.prototype.draw = function (cx, x, y, w, h, label) {
        cx.fillStyle = "rgba(0, 0, 0, 0.2)";
        round_rect(cx, x + 4, y + 4, w, h, 0.2 * h, true, false);
        var o = 0;
        var inside = false;
        inside = mx >= x && mx <= x + w && my >= y && my <= y + h;
        if (this.catch_mouse) {
            var dx = x + 0.5 * w - mx;
            var dy = y + 0.5 * h - my;
            inside = (Math.sqrt(dx * dx + dy * dy) <= 100);
        }
        if (inside) {
            this.catch_mouse = true;
            if (mouse_down) {
                o = 4;
            }
            if (mouse_klicked) {
                mouse_klicked = false;
                return true;
            }
            if (this.fuse_radius >= 100) {
                this.catch_mouse = false;
                this.fuse_radius = 0;
                return true;
            }
        }
        else {
            this.catch_mouse = false;
            this.fuse_radius = 0;
        }
        if (inside)
            cx.fillStyle = "rgb(240,255,240)";
        else
            cx.fillStyle = "white";
        round_rect(cx, x + o, y + o, w, h, 0.2 * h, true, true);
        cx.fillStyle = "black";
        cx.textAlign = "center";
        cx.fillText(label, x + 0.5 * w + o, y + 0.5 * h + o + 4);
        if (inside) {
            cx.strokeStyle = "green";
            circle(cx, x + 0.5 * w, y + 0.5 * h, 100, false, true);
        }
        if (this.fuse_radius > 0) {
            cx.strokeStyle = "green";
            cx.fillStyle = "rgba(0, 0, 0, 0.2)";
            circle(cx, x + 0.5 * w, y + 0.5 * h, this.fuse_radius, true, true);
        }
        return false;
    };
    return Fuse_button;
}());
