import { SchemaDirectiveVisitor } from "apollo-server";
import { GraphQLField, GraphQLObjectType, defaultFieldResolver } from "graphql";
class AuthDirective extends SchemaDirectiveVisitor {
  // hook 같은 느낌 upperDirecrive를 타입정의에 추가해주면 항상 이 클래스를 통과한다.
  public visitFieldDefinition(field: GraphQLField<any, any>, detail) {
    //console.dir(detail.objectType); 이 필드의 부모가 어떤 오브젝트인지를 알려준다.
    const { resolve = defaultFieldResolver } = field; //resolve = 밑에서 정의한 리졸버 파라미터는 4개까지 별도로 처리 가능
    console.log("In visitFieldDef");
    console.log("Field :", field.name);
    console.log(this.args);

    field.resolve = async function (...args) {
      const result = await resolve.apply(this, args); //result에 기존 리졸버 실행 결과 담김
      if (typeof result === "string") {
        // 조건에 맞으면 result를 변경 시킴
        return result.toUpperCase(); // 대문자로 말이지
      }
      return result; // 그 결과를 리턴 결국 새로운 결과를 반환하는 리졸버를 훅스로 만든거지
    };
  }
  public visitObject(object: GraphQLObjectType) {
    // Directive를 type User @auth {...} 즉 오브젝트 옆에 쓰면 이걸 실행
    console.log("In visitObject");
    console.log("Obj : ", object); //ex) User => User에 해당하는 obj정보와 안에있는 필드들 정보까지 포함함
    console.log("Args : ", this.args); //directive args
  }

  public ensureFieldsWrapped(object: GraphQLObjectType) {
    //
  }
}
// 실행순서
// obj -> fieldDef
export const auth = AuthDirective;
// visitSchema(schema: GraphQLSchema)
// visitScalar(scalar: GraphQLScalarType)
// visitObject(object: GraphQLObjectType)
// visitFieldDefinition(field: GraphQLField<any, any>)
// visitArgumentDefinition(argument: GraphQLArgument)
// visitInterface(iface: GraphQLInterfaceType)
// visitUnion(union: GraphQLUnionType)
// visitEnum(type: GraphQLEnumType)
// visitEnumValue(value: GraphQLEnumValue)
// visitInputObject(object: GraphQLInputObjectType)
// visitInputFieldDefinition(field: GraphQLInputField)
