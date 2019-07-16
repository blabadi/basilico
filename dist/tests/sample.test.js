var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const sum = (...a) => a.reduce((acc, val) => acc + val, 0);
test("Test Sum gives 0", () => __awaiter(this, void 0, void 0, function* () {
    expect(sum()).toBe(0);
}));
test("Sum Two Numbers", () => __awaiter(this, void 0, void 0, function* () {
    expect(sum(1, 2)).toBe(3);
}), 1000 /* optional timeout */);
//# sourceMappingURL=sample.test.js.map