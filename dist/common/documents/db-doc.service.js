"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbDocService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const fs = require("fs");
const path = require("path");
let DbDocService = class DbDocService {
    constructor() {
        if (process.env.NODE_ENV === 'local') {
            const storage = (0, typeorm_1.getMetadataArgsStorage)();
            this.metadata = storage.tables.map((table) => ({
                name: table.name,
                columns: storage.columns.filter((col) => col.target === table.target),
                relations: storage.relations.filter((rel) => rel.target === table.target),
            }));
            this.generateDbDocumentation();
        }
    }
    async generateDbDocumentation() {
        const doc = this.generateMarkdown();
        const outputPath = path.join(process.cwd(), 'docs', 'db-doc.md');
        const outputDir = path.dirname(outputPath);
        await fs.promises.mkdir(outputDir, { recursive: true });
        await fs.promises.writeFile(outputPath, doc, 'utf8');
    }
    generateMarkdown() {
        let markdown = '# 데이터베이스 설계 문서\n\n';
        markdown += "import { MermaidDiagram } from '@site/src/components/MermaidDiagram';\n\n";
        markdown += this.generateErdSection();
        markdown += this.generateEntityDetailsSection();
        markdown += this.generateRelationsSection();
        return markdown;
    }
    generateErdSection() {
        let section = '## ERD (Entity Relationship Diagram)\n\n';
        section += '<MermaidDiagram\n';
        section += 'title="database-erd"\n';
        section += 'chart={`\n';
        section += 'erDiagram\n';
        this.metadata.forEach((metadata) => {
            const entityName = metadata.name.replace(/[^a-zA-Z0-9]/g, '').replace(/s$/, '');
            section += `    ${entityName} {\n`;
            metadata.columns.forEach((column) => {
                let type = 'unknown';
                if (column.options?.type) {
                    if (typeof column.options.type === 'string') {
                        type = column.options.type;
                    }
                    else if (typeof column.options.type === 'function') {
                        switch (column.options.type.name) {
                            case 'String':
                                type = 'string';
                                break;
                            case 'Number':
                                type = 'number';
                                break;
                            case 'Boolean':
                                type = 'boolean';
                                break;
                            case 'Date':
                                type = 'date';
                                break;
                            default:
                                type = column.options.type.name.toLowerCase();
                        }
                    }
                }
                const isPrimary = column.options?.primary ? 'PK' : '';
                section += `        ${type} ${column.propertyName} ${isPrimary}\n`;
            });
            section += '    }\n';
        });
        this.metadata.forEach((metadata) => {
            const sourceEntity = metadata.name.replace(/[^a-zA-Z0-9]/g, '').replace(/s$/, '');
            metadata.relations.forEach((relation) => {
                const targetEntity = relation.type.toString().split('.').pop();
                if (targetEntity) {
                    const sanitizedTarget = targetEntity
                        .toLowerCase()
                        .replace(/[^a-zA-Z0-9]/g, '')
                        .replace(/s$/, '');
                    let cardinality = '||--o{';
                    if (relation.relationType === 'one-to-one') {
                        cardinality = '||--||';
                    }
                    else if (relation.relationType === 'many-to-one') {
                        cardinality = '}|--||';
                    }
                    const relationDesc = relation.relationType === 'many-to-one' ? 'belongs_to' : 'has';
                    section += `    ${sourceEntity} ${cardinality} ${sanitizedTarget} : ${relationDesc}\n`;
                }
            });
        });
        section += '`}\n';
        section += '/>\n\n';
        return section;
    }
    generateEntityDetailsSection() {
        let section = '## 엔티티 상세 정보\n\n';
        this.metadata.forEach((metadata) => {
            section += `### ${metadata.name}\n\n`;
            section += '| 컬럼명 | 타입 | 제약조건 | 설명 |\n';
            section += '|--------|------|-----------|------|\n';
            metadata.columns.forEach((column) => {
                const constraints = [];
                if (column.options.primary)
                    constraints.push('PK');
                if (!column.options.nullable)
                    constraints.push('NOT NULL');
                if (column.options.unique)
                    constraints.push('UNIQUE');
                let type = column.options.type;
                if (typeof type === 'function') {
                    type = type.name;
                }
                section += `| ${column.propertyName} | ${type} | ${constraints.join(', ')} | ${column.options?.comment || ''} |\n`;
            });
            section += '\n';
        });
        return section;
    }
    generateRelationsSection() {
        let section = '## 관계 정보\n\n';
        this.metadata.forEach((metadata) => {
            if (metadata.relations.length > 0) {
                section += `### ${metadata.name} 관계\n\n`;
                section += '| 관계 타입 | 대상 엔티티 | 설명 |\n';
                section += '|------------|-------------|------|\n';
                metadata.relations.forEach((relation) => {
                    const targetEntity = relation.type.toString();
                    const relationType = relation.relationType;
                    section += `| ${relationType} | ${targetEntity} | ${relation.options?.comment || ''} |\n`;
                });
                section += '\n';
            }
        });
        return section;
    }
};
exports.DbDocService = DbDocService;
exports.DbDocService = DbDocService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DbDocService);
//# sourceMappingURL=db-doc.service.js.map