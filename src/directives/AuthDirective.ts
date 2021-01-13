import { SchemaDirectiveVisitor } from "apollo-server"
import { GraphQLField, GraphQLObjectType, defaultFieldResolver } from "graphql"
import { jwtVerification } from "../lib"

class AuthDirective extends SchemaDirectiveVisitor {
	public visitFieldDefinition(field: GraphQLField<any, any>, detail) {
		//detail.objectType 이 필드의 부모가 어떤 오브젝트인지
		this.ensureFieldsWrapped(detail.objectType)
		field["_reqAuthRole"] = this.args.req
	}
	public visitObject(objectType: GraphQLObjectType) {
		this.ensureFieldsWrapped(objectType)
		objectType["_reqAuthRole"] = this.args.req
	}

	public ensureFieldsWrapped(objectType: GraphQLObjectType) {
		if (objectType["_authFieldsWrapped"]) return
		// objectType["_reqAuthRole"] = 부모 기준 권한

		const fields = objectType.getFields() // ojbect의 필드들을 반환
		for (let fieldName in fields) {
			const field = fields[fieldName]
			const { resolve = defaultFieldResolver } = field
			field.resolve = async function (...args) {
				// resovle에 hook 코드와 기존 resolve 실행결과 반환
				const reqRole = field["_reqAuthRole"] || objectType["_reqAuthRole"]

				if (!reqRole) {
					return resolve.apply(this, args)
				}

				const { req, prisma } = args[2] //  args[2] = context
				const userRole = await jwtVerification(req, prisma)
				//authentication check

				if (reqRole !== userRole && userRole !== "ADMIN") {
					//autherization check
					//ADMIN이거나 접근권한이 있어야 접근가능
					throw new Error("접근 권한 없음")
				}
				return resolve.apply(this, args)
			}
		}
	}
}

export const auth = AuthDirective
