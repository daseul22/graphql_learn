import { SchemaDirectiveVisitor } from "apollo-server";
class AuthDirective extends SchemaDirectiveVisitor {
  // hook 같은 느낌 upperDirecrive를 타입정의에 추가해주면 항상 이 클래스를 통과한다.
  visitFieldDefinition(field, b) {
    const { resolve } = field; //resolve = 밑에서 정의한 리졸버 파라미터는 4개까지 별도로 처리 가능
    console.log("In visitFieldDef");
    console.log("Field :", field.name);
    console.log(this.args);
    //console.log(field.astNode.directives[0].arguments);
    field.resolve = async function (...args) {
      const result = await resolve.apply(this, args); //result에 기존 리졸버 실행 결과 담김
      if (typeof result === "string") {
        // 조건에 맞으면 result를 변경 시킴
        return result.toUpperCase(); // 대문자로 말이지
      }
      return result; // 그 결과를 리턴 결국 새로운 결과를 반환하는 리졸버를 훅스로 만든거지
    };
  }
  visitObject(obj) {
    // Directive를 type User @auth {...} 즉 오브젝트 옆에 쓰면 이걸 실행
    console.log("In visitObject");
    console.log("Obj : ", obj); //ex) User => User에 해당하는 obj정보와 안에있는 필드들 정보까지 포함함
    console.log("Args : ", this.args); //directive args
  }
}
// 실행순서
// obj -> fieldDef
export const auth = AuthDirective;
