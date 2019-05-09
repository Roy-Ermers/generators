export class Range {
	public min: number;
	public max: number;

	/**
	 * 
	 * @param min minimal value of the range
	 * @param max Maximal value of the range if not used the minimal value is used.
	 */
	constructor(min: number, max?: number) {
		this.min = min;
		//if max is not defined this range is constant.
		this.max = max || min;
	}

	Check(number: number) {
		return this.min <= number && this.max >= number;
	}

	toString() {
		return `(${this.min}> . <${this.max})`
	}
}
class Vector3 {
	public x: number;
	public y: number;
	public z: number;
	constructor(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
	public dot2(x: number, y: number) {
		return this.x * x + this.y * y;
	};

	public dot3(x: number, y: number, z: number) {
		return this.x * x + this.y * y + this.z * z;
	};
}
export class Noise {
	public seed: number = Math.random();
	//#region lookup tables

	private static grad3 = [new Vector3(1, 1, 0), new Vector3(-1, 1, 0), new Vector3(1, -1, 0), new Vector3(-1, -1, 0),
	new Vector3(1, 0, 1), new Vector3(-1, 0, 1), new Vector3(1, 0, -1), new Vector3(-1, 0, -1),
	new Vector3(0, 1, 1), new Vector3(0, -1, 1), new Vector3(0, 1, -1), new Vector3(0, -1, -1)];
	private static gradP = new Array(512);
	private static p: number[] = [151, 160, 137, 91, 90, 15,
		131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
		190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
		88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
		77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
		102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
		135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123,
		5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
		223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
		129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
		251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
		49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
		138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];

	private static perm: number[] = [];
	constructor(seed?: number) {
		this.Seed(seed || 0);
	}
	//#endregion

	Seed(seed: number) {
		if (seed > 0 && seed < 1) {
			seed *= 65536;
		}

		seed = Math.floor(seed);
		if (seed < 256) {
			seed |= seed << 8;
		}

		for (let i = 0; i < 256; i++) {
			let v;
			if (i & 1) {
				v = Noise.p[i] ^ (seed & 255);
			} else {
				v = Noise.p[i] ^ ((seed >> 8) & 255);
			}

			Noise.perm[i] = Noise.perm[i + 256] = v;
			Noise.gradP[i] = Noise.gradP[i + 256] = Noise.grad3[v % 12];
		}
	}
	get(x: number, y: number) {
		let F2 = 0.5 * (Math.sqrt(3) - 1);
		let G2 = (3 - Math.sqrt(3)) / 6;

		let n0, n1, n2;
		let s = (x + y) * F2;
		let i = Math.floor(x + s);
		let j = Math.floor(y + s);
		let t = (i + j) * G2;
		let x0 = x - i + t;
		let y0 = y - j + t;
		let i1, j1;
		if (x0 > y0) {
			i1 = 1; j1 = 0;
		} else {
			i1 = 0; j1 = 1;
		}
		let x1 = x0 - i1 + G2;
		let y1 = y0 - j1 + G2;
		let x2 = x0 - 1 + 2 * G2;
		let y2 = y0 - 1 + 2 * G2;

		i &= 255;
		j &= 255;
		let gi0 = Noise.gradP[i + Noise.perm[j]];
		let gi1 = Noise.gradP[i + i1 + Noise.perm[j + j1]];
		let gi2 = Noise.gradP[i + 1 + Noise.perm[j + 1]];

		let t0 = 0.5 - x0 * x0 - y0 * y0;
		if (t0 < 0) {
			n0 = 0;
		} else {
			t0 *= t0;
			n0 = t0 * t0 * gi0.dot2(x0, y0);
		}
		let t1 = 0.5 - x1 * x1 - y1 * y1;
		if (t1 < 0) {
			n1 = 0;
		} else {
			t1 *= t1;
			n1 = t1 * t1 * gi1.dot2(x1, y1);
		}
		let t2 = 0.5 - x2 * x2 - y2 * y2;
		if (t2 < 0) {
			n2 = 0;
		} else {
			t2 *= t2;
			n2 = t2 * t2 * gi2.dot2(x2, y2);
		}


		return (70 * (n0 + n1 + n2) + 1) / 2;
	}
}

