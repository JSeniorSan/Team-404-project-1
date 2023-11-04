"""New tables Workspaces and Panels

Revision ID: a365fd602811
Revises: 259d9d651b46
Create Date: 2023-11-04 23:21:44.311448

"""
from typing import Sequence, Union

from alembic import op
import fastapi_users_db_sqlalchemy
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'a365fd602811'
down_revision: Union[str, None] = '259d9d651b46'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('workspaces',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('user_id', fastapi_users_db_sqlalchemy.generics.GUID(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('panels',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=16), nullable=False),
    sa.Column('workspace_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['workspace_id'], ['workspaces.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('tasks', sa.Column('panel_id', sa.Integer(), nullable=False))
    op.alter_column('tasks', 'created_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
    op.drop_constraint('tasks_user_id_fkey', 'tasks', type_='foreignkey')
    op.create_foreign_key(None, 'tasks', 'panels', ['panel_id'], ['id'])
    op.drop_column('tasks', 'user_id')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tasks', sa.Column('user_id', sa.UUID(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'tasks', type_='foreignkey')
    op.create_foreign_key('tasks_user_id_fkey', 'tasks', 'user', ['user_id'], ['id'])
    op.alter_column('tasks', 'created_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
    op.drop_column('tasks', 'panel_id')
    op.drop_table('panels')
    op.drop_table('workspaces')
    # ### end Alembic commands ###
