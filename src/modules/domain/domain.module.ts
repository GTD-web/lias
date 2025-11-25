import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainCategoryModule } from './category/category.module';
import { DomainDocumentTemplateModule } from './document-template/document-template.module';
import { DomainDocumentModule } from './document/document.module';
import { DomainDocumentRevisionModule } from './document-revision/document-revision.module';
import { DomainEmployeeModule } from './employee/employee.module';
import { DomainDepartmentModule } from './department/department.module';
import { DomainPositionModule } from './position/position.module';
import { DomainRankModule } from './rank/rank.module';
import { DomainEmployeeDepartmentPositionModule } from './employee-department-position/employee-department-position.module';
import { DomainApprovalStepTemplateModule } from './approval-step-template/approval-step-template.module';
import { DomainApprovalStepSnapshotModule } from './approval-step-snapshot/approval-step-snapshot.module';
import { DomainCommentModule } from './comment/comment.module';

// 엔티티 import
import { Category } from './category/category.entity';
import { DocumentTemplate } from './document-template/document-template.entity';
import { Document } from './document/document.entity';
import { DocumentRevision } from './document-revision/document-revision.entity';
import { Employee } from './employee/employee.entity';
import { Department } from './department/department.entity';
import { Position } from './position/position.entity';
import { Rank } from './rank/rank.entity';
import { EmployeeDepartmentPosition } from './employee-department-position/employee-department-position.entity';
import { ApprovalStepTemplate } from './approval-step-template/approval-step-template.entity';
import { ApprovalStepSnapshot } from './approval-step-snapshot/approval-step-snapshot.entity';
import { Comment } from './comment/comment.entity';

/**
 * 글로벌 도메인 모듈
 * 모든 도메인 모듈을 통합하여 전역으로 제공합니다.
 * 컨텍스트 모듈에서 필요한 도메인 서비스를 자유롭게 사용할 수 있습니다.
 */
@Global()
@Module({
    imports: [
        // TypeORM 엔티티 등록
        TypeOrmModule.forFeature([
            Category,
            DocumentTemplate,
            Document,
            DocumentRevision,
            Employee,
            Department,
            Position,
            Rank,
            EmployeeDepartmentPosition,
            ApprovalStepTemplate,
            ApprovalStepSnapshot,
            Comment,
        ]),
        // 도메인 모듈들
        DomainCategoryModule,
        DomainDocumentTemplateModule,
        DomainDocumentModule,
        DomainDocumentRevisionModule,
        DomainEmployeeModule,
        DomainDepartmentModule,
        DomainPositionModule,
        DomainRankModule,
        DomainEmployeeDepartmentPositionModule,
        DomainApprovalStepTemplateModule,
        DomainApprovalStepSnapshotModule,
        DomainCommentModule,
    ],
    exports: [
        // 모든 도메인 서비스를 export하여 다른 모듈에서 사용 가능하도록 함
        DomainCategoryModule,
        DomainDocumentTemplateModule,
        DomainDocumentModule,
        DomainDocumentRevisionModule,
        DomainEmployeeModule,
        DomainDepartmentModule,
        DomainPositionModule,
        DomainRankModule,
        DomainEmployeeDepartmentPositionModule,
        DomainApprovalStepTemplateModule,
        DomainApprovalStepSnapshotModule,
        DomainCommentModule,
    ],
})
export class DomainModule {}

